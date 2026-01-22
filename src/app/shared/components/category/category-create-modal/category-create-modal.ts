import { Component, inject, input, output, signal } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { CreateCategoryRequest } from '../../../types/category.models';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-create-modal',
  imports: [CategoryForm],
  templateUrl: './category-create-modal.html',
  styleUrl: './category-create-modal.scss',
})
export class CategoryCreateModal {
  private categoryService = inject(CategoryService);

  // Signal to hold data if we are editing (pass null if creating)
  categoryData = signal<any>(null);

  apiUrl = 'https://sellify-retail-cpbgdhhug0cafre0.italynorth-01.azurewebsites.net/api/categories';

  onSuccessEmit = output<void>();

  closeModal() {
    const modalCont: any = document.querySelector('.create-modal-container')!;
    modalCont.style.display = 'none';
  }

  // Handle the data emitted from your extracted form
  handleFormSubmit(event: { formData: any; file: File | null }) {
    const { formData, file } = event;

    const request: CreateCategoryRequest = {
      name: formData.name,
      description: formData.description,
      slug: formData.slug,
      parentId: formData.parentId || null,
      isActive: formData.isActive,
      iconFile: file, // Use the file passed from the child
    };

    this.categoryService.createCategory(this.apiUrl, request).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.closeModal();
        this.onSuccessEmit.emit();
      },
      error: (err) => console.error('Failed:', err),
    });
  }
}

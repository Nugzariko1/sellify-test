import { Component, inject, input, signal } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryResponse, CreateCategoryRequest } from '../../../types/category.models';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-update-modal',
  imports: [CategoryForm],
  templateUrl: './category-update-modal.html',
  styleUrl: './category-update-modal.scss',
})
export class CategoryUpdateModal {
  private categoryService = inject(CategoryService);

  // Signal to hold data if we are editing (pass null if creating)
  categoryData = input<CategoryResponse | null>(null);

  apiUrl = 'https://sellify-retail-cpbgdhhug0cafre0.italynorth-01.azurewebsites.net/api/categories';

  closeModal() {
    const modalCont: any = document.querySelector('.update-modal-container')!;
    modalCont.style.display = 'none';
  }

  deleteCategory(id: string | undefined) {
    if (id === undefined) {
      console.error('id is undefined');
      return;
    }
    this.categoryService.deleteCategory(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        console.log('Category deleted successfully');
        const modalCont: any = document.querySelector('.update-modal-container')!;
        modalCont.style.display = 'none';
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
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
      },
      error: (err) => console.error('Failed:', err),
    });
  }
}

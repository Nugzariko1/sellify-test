import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { CreateCategoryRequest } from '../../types/category.models';

@Component({
  selector: 'app-category-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
})
export class CategoryModal {
  createCategoryForm: FormGroup;
  apiUrl: string =
    'https://sellify-retail-cpbgdhhug0cafre0.italynorth-01.azurewebsites.net/api/categories';

  constructor(private categoryService: CategoryService) {
    this.createCategoryForm = new FormBuilder().group({
      name: ['', Validators.required],
      description: [''],
      slug: [''],
      parentId: [''],
      isActive: [true],
      iconFile: [null],
    });
  }

  closeModal() {
    const modalCont: any = document.querySelector('.modal-container')!;
    modalCont.style.display = 'none';
  }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Manually update the form value
      this.createCategoryForm.patchValue({
        iconFile: file,
      });
    }
  }

  createCategory() {
    const request: CreateCategoryRequest = {
      name: this.createCategoryForm.value.name,
      description: this.createCategoryForm.value.description,
      slug: this.createCategoryForm.value.slug,
      parentId: null,
      isActive: this.createCategoryForm.value.isActive,
      iconFile: this.createCategoryForm.value.iconFile,
    };

    return this.categoryService.createCategory(this.apiUrl, request).subscribe({
      next: (response) => {
        console.log('Category created successfully:', response);
      },
      error: (error) => {
        console.error('Category creation failed:', error);
      },
    });
  }
}

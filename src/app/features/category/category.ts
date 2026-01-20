import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CategoryService } from '../../shared/services/category/category.service';
import { ApiResponse } from '../../shared/types/api.response';
import { CategoryResponse } from '../../shared/types/category.models';
import { CategoryCreateModal } from '../../shared/components/category/category-create-modal/category-create-modal';
import { CategoryUpdateModal } from '../../shared/components/category/category-update-modal/category-update-modal';

@Component({
  selector: 'app-category',
  imports: [CommonModule, CategoryCreateModal, CategoryUpdateModal],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  categories = signal<ApiResponse<CategoryResponse[]>>({ data: [], message: '', success: false });
  apiUrl: string =
    'https://sellify-retail-cpbgdhhug0cafre0.italynorth-01.azurewebsites.net/api/categories';
  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }

  async getCategories() {
    this.categoryService.getCategories(this.apiUrl).subscribe({
      next: (response) => {
        console.log('Categories fetched successfully:', response);
        this.categories.set(response);
      },
      error: (error) => {
        console.error('Failed to fetch categories:', error);
      },
    });
  }

  openCreateModal() {
    const modalCont: any = document.querySelector('.create-modal-container')!;
    modalCont.style.display = 'block';
  }

  openUpdateModal() {
    const modalCont: any = document.querySelector('.update-modal-container')!;
    modalCont.style.display = 'block';
  }
}

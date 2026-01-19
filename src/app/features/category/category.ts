import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CategoryService } from '../../shared/services/category/category.service';
import { ApiResponse } from '../../shared/types/api.response';
import { CategoryResponse } from '../../shared/types/category.models';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  categories = signal<ApiResponse<CategoryResponse[]>>({ data: [], message: '', success: false });
  apiUrl: string = 'https://localhost:7170/api/categories';
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
}

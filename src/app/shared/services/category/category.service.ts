import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse, CreateCategoryRequest } from '../../types/category.models';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../../types/api.response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(apiUrl: string): Observable<ApiResponse<CategoryResponse[]>> {
    return this.httpClient.get<ApiResponse<CategoryResponse[]>>(apiUrl);
  }

  createCategory(
    apiUrl: string,
    request: CreateCategoryRequest,
  ): Observable<ApiResponse<CategoryResponse>> {
    const formData = new FormData();

    // Append text fields
    formData.append('name', request.name);
    formData.append('description', request.description || '');
    formData.append('slug', request.slug);
    formData.append('isActive', String(request.isActive));

    if (request.parentId) {
      formData.append('parentId', request.parentId);
    }

    // Append the actual file
    if (request.iconFile) {
      formData.append('iconFile', request.iconFile);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      // Do NOT set Content-Type: multipart/form-data manually.
      // The browser will do it automatically with the correct "boundary".
    });

    return this.httpClient.post<ApiResponse<CategoryResponse>>(apiUrl, formData, { headers });
  }

  deleteCategory(apiUrl: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    return this.httpClient.delete(apiUrl, { headers });
  }
}

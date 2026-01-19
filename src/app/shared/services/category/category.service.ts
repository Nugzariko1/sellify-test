import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse } from '../../types/category.models';
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LogInRequest,
  LogInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../../types/auth.models';
import { ApiResponse } from '../../types/api.response';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  logIn(apiUrl: string, request: LogInRequest): Observable<ApiResponse<LogInResponse>> {
    return this.httpClient.post<ApiResponse<LogInResponse>>(apiUrl, request);
  }

  signUp(apiUrl: string, request: SignUpRequest): Observable<ApiResponse<SignUpResponse>> {
    return this.httpClient.post<ApiResponse<SignUpResponse>>(apiUrl, request);
  }
}

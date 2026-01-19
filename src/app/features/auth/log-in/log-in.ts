import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogInRequest } from '../../../shared/types/auth.models';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  loginForm: FormGroup;

  apiUrl: string =
    'https://sellify-retail-cpbgdhhug0cafre0.italynorth-01.azurewebsites.net/api/auth';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
      // Handle login logic here
    }
  }

  async login() {
    const request: LogInRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.logIn(`${this.apiUrl}/log-in`, request).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}

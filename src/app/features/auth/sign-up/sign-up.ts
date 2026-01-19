import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SignUpRequest } from '../../../shared/types/auth.models';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  signupForm: FormGroup;

  apiUrl: string =
    'https://sellify-retail-cpbgdhhug0cafre0.italynorth-01.azurewebsites.net/api/auth';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+995\s\d{3}-\d{2}-\d{2}-\d{2}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      acceptedTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signUp();
      // Handle sign-up logic here
    }
  }

  async signUp() {
    const request: SignUpRequest = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phoneNumber,
      password: this.signupForm.value.password,
      acceptedTerms: this.signupForm.value.acceptedTerms,
    };

    this.authService.signUp(`${this.apiUrl}/sign-up`, request).subscribe({
      next: (response) => {
        console.log('Sign up successful:', response);
      },
      error: (error) => {
        console.error('Sign up failed:', error);
      },
    });
  }
}

import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryResponse } from '../../../types/category.models';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm {
  private fb = inject(FormBuilder);

  // Configuration Inputs
  title = input<string>('Create Category');
  buttonText = input<string>('Confirm');

  // Data Input (for Edit mode)
  initialData = input<CategoryResponse | null>(null);

  // Event Output
  submitted = output<{ formData: any; file: File | null }>();

  protected categoryForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    slug: ['', [Validators.required]],
    parentId: [''],
    isActive: [true],
    iconFile: [null, [Validators.required]],
  });

  private selectedFile: File | null = null;

  constructor() {
    // This effect runs every time initialData() signal changes
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.categoryForm.patchValue({
          name: data.name,
          description: data.description,
          slug: data.slug,
          parentId: data.parentId,
          isActive: data.isActive,
        });
        // Note: You cannot programmatically set a File input value for security reasons.
        // We usually clear the validator for edit mode or handle it separately.
        this.categoryForm.get('iconFile')?.clearValidators();
        this.categoryForm.get('iconFile')?.updateValueAndValidity();
      } else {
        this.categoryForm.reset({ isActive: true });
      }
    });
  }

  ngOnInit() {
    if (this.initialData()) {
      if (this.initialData() != null) {
        this.categoryForm.patchValue(this.initialData()!);
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.categoryForm.patchValue({ iconFile: file });
    }
  }

  submit() {
    if (this.categoryForm.valid) {
      this.submitted.emit({
        formData: this.categoryForm.value,
        file: this.selectedFile,
      });
    }
  }
}

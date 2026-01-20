import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  initialData = input<any>(null);

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
    // Reactively update form when initialData changes (Signal Effect)
    // In Angular 21, we can use effect() or just patch in ngOnInit
  }

  ngOnInit() {
    if (this.initialData()) {
      this.categoryForm.patchValue(this.initialData());
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

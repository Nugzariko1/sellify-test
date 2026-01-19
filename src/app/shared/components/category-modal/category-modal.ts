import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
})
export class CategoryModal {
  createCategoryForm: FormGroup;

  constructor() {
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

  createCategory() {}
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-category-modal',
  imports: [],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
})
export class CategoryModal {
  loginForm: any;
  closeModal() {
    const modalCont: any = document.querySelector('.modal-container')!;
    modalCont.style.display = 'none';
  }
}

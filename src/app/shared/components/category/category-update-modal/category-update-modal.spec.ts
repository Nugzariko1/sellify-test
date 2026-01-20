import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUpdateModal } from './category-update-modal';

describe('CategoryUpdateModal', () => {
  let component: CategoryUpdateModal;
  let fixture: ComponentFixture<CategoryUpdateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryUpdateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUpdateModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

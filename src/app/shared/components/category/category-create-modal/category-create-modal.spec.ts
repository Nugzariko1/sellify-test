import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateModal } from './category-create-modal';

describe('CategoryCreateModal', () => {
  let component: CategoryCreateModal;
  let fixture: ComponentFixture<CategoryCreateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCreateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreateModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

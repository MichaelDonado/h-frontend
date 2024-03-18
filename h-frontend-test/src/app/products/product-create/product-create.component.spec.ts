import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateComponent } from './product-create.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { FormValidationService } from 'src/app/shared/services/form-validation-service.service';


describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let productService: ProductService;

  let mockProductService = {
    createProduct: jasmine.createSpy('createProduct').and.returnValue(of({})),
  };

  const mockFormValidationService = {
    validateExistID: () => () => of(true),
    isInvalid: () => () => of(true),
    getFieldErrorMessage: () => () => of(''),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCreateComponent,ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: FormValidationService, useValue: mockFormValidationService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

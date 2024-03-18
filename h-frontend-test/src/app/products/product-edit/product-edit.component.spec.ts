import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../product.service';
import { FormValidationService } from 'src/app/shared/services/form-validation-service.service';

describe('ProductEditComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;

  let mockProductService = {
    updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of({})),
  };

  const mockFormValidationService = {
    validateProductId: () => () => of(true),
    validateExistID: () => () => of(true),
    isInvalid: () => () => of(true),
    getFieldErrorMessage: () => () => of(''),
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 'trc-3'
      },
      data: {
        product: {
          id: 'trc-3',
          name: 'Product 1',
          description: 'Description of Product 1',
          date_release: '2023-08-01',
          date_revision: '2023-08-15',
          logo: 'logo1.jpg'
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductEditComponent, ProductFormComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: FormValidationService, useValue: mockFormValidationService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

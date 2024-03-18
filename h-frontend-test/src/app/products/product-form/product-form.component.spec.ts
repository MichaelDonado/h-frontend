import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductFormComponent } from './product-form.component';
import { DateService } from '../../shared/services/date-service.service';
import { FormValidationService } from '../../shared/services/form-validation-service.service';
import { ProductService } from 'src/app/products/product.service';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;

  const mockProductService = {
    createProduct: jasmine.createSpy('createProduct').and.returnValue(of({})),
    updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of({})),
  };

  const mockFormValidationService = {
    validateExistID: () => () => of(true),
    isInvalid: () => () => of(true),
    getFieldErrorMessage: () => () => of(''),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: FormValidationService, useValue: mockFormValidationService }
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


  it('should call createProduct method when submitting new product form', async () => {
    component.registrationForm.patchValue({
      id: 'new-id',
      name: 'New Product',
      description: 'Description of the new product',
      date_release: '2023-09-01',
      logo: 'new-product-logo.jpg'
    });

    await fixture.whenStable();

    component.onSubmit();

    expect(productService.createProduct).toHaveBeenCalledWith({
      id: 'new-id',
      name: 'New Product',
      description: 'Description of the new product',
      date_release: '2023-09-01',
      logo: 'new-product-logo.jpg',
      date_revision: jasmine.any(String)
    });
  });


  it('should display error messages for invalid fields', () => {
    const idField = component.registrationForm.get('id');
    const descriptionField = component.registrationForm.get('description');
    idField?.setValue('');
    descriptionField?.setValue('');
  
    fixture.detectChanges();
  
    const errorMessages = fixture.nativeElement.querySelectorAll('.error-message');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    const idField = component.registrationForm.get('id');
    idField?.setValue('');
    
    fixture.detectChanges();
    
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    
    // Set valid values for form fields
    component.registrationForm.patchValue({
      id: 'valid-id',
      name: 'Valid Name',
      description: 'Valid Description',
      date_release: '2023-09-01',
      logo: 'valid-logo.jpg'
    });
    
    fixture.detectChanges();
    
    expect(submitButton.disabled).toBe(false);
  });
  

  it('should call onSubmit method when submit button is clicked', async () => {
    spyOn(component, 'onSubmit');
  
    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    submitButton.disabled = false; 
    fixture.detectChanges();  
    submitButton.click();
  
    expect(component.onSubmit).toHaveBeenCalled();
  });

});

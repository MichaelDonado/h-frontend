import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { FormValidationService } from './form-validation-service.service';
const mockService = {
  verificationId: (id: any) => of(true), // Replace this with a valid implementation
};

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return appropriate error message for a required field', () => {
    const fieldName = 'name';
    const errorType = 'required';
    const formGroup = new FormGroup({
      [fieldName]: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    });

    const errorMessage = service.getFieldErrorMessage(fieldName, errorType, formGroup);
    expect(errorMessage).toContain('requerido');
  });


  it('should return empty string for a valid field', () => {
    const fieldName = 'name';
    const errorType = 'required';
    const formGroup = new FormGroup({
      [fieldName]: new FormControl('name test', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    });

    const errorMessage = service.getFieldErrorMessage(fieldName, errorType, formGroup);
    expect(errorMessage).toEqual('');
  });

});

import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map, of, tap } from 'rxjs';
import { FieldErrorMessages } from 'src/app/products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  getFieldErrorMessage(
    fieldName: string,
    errorType: keyof FieldErrorMessages,
    registrationForm: AbstractControl
  ): string {
    const field = registrationForm.get(fieldName);

    if (field?.hasError(errorType)) {
      const errors: FieldErrorMessages = {
        required: `${fieldName} es requerido.`,
        minlength: `${fieldName} debe tener al menos ${field.errors?.['minlength']?.requiredLength ?? 0} caracteres.`,
        maxlength: `${fieldName} no debe tener más de ${field.errors?.['maxlength']?.requiredLength ?? 0} caracteres.`,
        idExist: `El ${fieldName.toUpperCase()} ya existe en la base de datos`,
      };

      return errors[errorType];
    }

    return '';
  }

  isInvalid(controlName: string, registrationForm: AbstractControl): boolean {
    const control = registrationForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  validateExistID(service: any): AsyncValidatorFn {
    return (control: AbstractControl): import("rxjs").Observable<ValidationErrors | null> => {
      return service.verificationId(control.value).pipe(
        map((isValid: boolean) => {
          return isValid ? { idExist: true } : null;
        }),
        catchError((error) => {
          console.error('Error verifying product ID:', error);
          return of(null);
        })
      );
    };
  }
}

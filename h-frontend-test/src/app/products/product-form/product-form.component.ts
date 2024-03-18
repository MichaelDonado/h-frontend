import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { DateService } from '../../shared/services/date-service.service';
import { FormValidationService } from '../../shared/services/form-validation-service.service';
import { FieldErrorMessages, Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() isEdit = false;
  @Input() initialValues!: Product;

  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  isSubmitting = false;

  isComplete = false;

  registrationForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dateService: DateService,
    private formValidationService: FormValidationService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onInput() {
    this.isComplete = false;
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      type: ['', Validators.required],
      priority: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });


    if (this.isEdit) {
      this.registrationForm.patchValue({
        ...this.initialValues,
      });
    }
  }

  getFieldErrorMessage(fieldName: string, errorType: keyof FieldErrorMessages): string {
    return this.formValidationService.getFieldErrorMessage(fieldName, errorType, this.registrationForm);
  }

  isInvalid(controlName: string): boolean {
    return this.formValidationService.isInvalid(controlName, this.registrationForm);
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formValues: Product = {
      ...this.registrationForm.value,

    };

    const action$ = this.isEdit
      ? this.productService.updateProduct({ ...formValues, id: this.initialValues.id})
      : this.productService.createProduct(formValues);

    action$.pipe(
      finalize(() => {
        this.isSubmitting = false;
      
        this.isEdit ? this.router.navigate(['/products']) : this.resetForm();
      }),
      tap({
        next: (result) => {
          console.log(this.isEdit ? 'Producto actualizado:' : 'Producto creado:', result);
          this.isComplete = true;
          this.submitForm.emit(result);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })
    ).subscribe();
  }

  resetForm() {
    this.registrationForm.reset();
  }

}

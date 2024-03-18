import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateService } from './services/date-service.service';
import { FormValidationService } from './services/form-validation-service.service';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    DateService,
    FormValidationService,
  ]
})
export class SharedModule { }

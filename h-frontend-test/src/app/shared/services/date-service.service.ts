import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { format, startOfToday, isAfter, isToday } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: string): string {
    if (!date) {
      return '';
    }
    const utcDate = new Date(date);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return format(localDate, 'yyyy-MM-dd');
  }

  validateDateIsBeforeOrToday(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const selectedDateUTC = new Date(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate());
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return selectedDateUTC >= today ? null : { invalidDate: true };
  }



}

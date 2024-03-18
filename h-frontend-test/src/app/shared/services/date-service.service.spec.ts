import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { DateService } from './date-service.service';


describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should format a date string correctly', () => {
      const dateStr = '2023-08-30T12:00:00Z';
      const formattedDate = service.formatDate(dateStr);
      expect(formattedDate).toBe('2023-08-30');
    });

    it('should return an empty string for an empty date', () => {
      const emptyDateStr = '';
      const formattedDate = service.formatDate(emptyDateStr);
      expect(formattedDate).toBe('');
    });
  });

  describe('validateDateIsBeforeOrToday', () => {
    it('should return null for a date equal to today', () => {
      const today = new Date();
      const formControl = new FormControl(service.formatDate(today.toISOString()));
      const validationErrors = service.validateDateIsBeforeOrToday(formControl);
      expect(validationErrors).toBeNull();
    });

    it('should return ValidationErrors for a date after today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formControl = new FormControl(service.formatDate(yesterday.toISOString()));
      const validationErrors = service.validateDateIsBeforeOrToday(formControl);
      expect(validationErrors).toEqual({ invalidDate: true });
    });

    it('should return null for a date before today', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formControl = new FormControl(service.formatDate(tomorrow.toISOString()));
      const validationErrors = service.validateDateIsBeforeOrToday(formControl);
      expect(validationErrors).toBeNull();
    });

  });
});

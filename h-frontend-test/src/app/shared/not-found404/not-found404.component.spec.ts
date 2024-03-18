import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound404Component } from './not-found404.component';


describe('NotFound404Component', () => {
  let component: NotFound404Component;
  let fixture: ComponentFixture<NotFound404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFound404Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct error message', () => {
    const errorMessage = 'Lo sentimos, la página que estás buscando no se encuentra.';
    const errorElement: HTMLElement = fixture.nativeElement;
    const errorMessageElement = errorElement.querySelector('.error-message');
    expect(errorMessageElement?.textContent).toContain(errorMessage);
  });

  it('should have a "Volver al Inicio" button', () => {
    const errorElement: HTMLElement = fixture.nativeElement;
    const backButton: HTMLAnchorElement | null = errorElement.querySelector('.error-button');
    expect(backButton).toBeTruthy();
    expect(backButton?.textContent).toContain('Volver al Inicio');
  });

  it('should call goToHome method when "Volver al Inicio" button is clicked', () => {
    spyOn(component, 'goToHome');
    const errorElement: HTMLElement = fixture.nativeElement;
    const backButton: HTMLAnchorElement | null = errorElement.querySelector('.error-button');
    backButton?.click();
    expect(component.goToHome).toHaveBeenCalled();
  });
});

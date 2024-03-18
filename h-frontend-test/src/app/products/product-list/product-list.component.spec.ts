import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './../product.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  const mockProducts = [
    {
      id: 'trc-3',
      name: 'Product 1',
      description: 'Description of Product 1',
      date_release: '2023-08-01',
      date_revision: '2023-08-15',
      logo: 'logo1.jpg'
    },
    {
      id: 'trc-2',
      name: 'Product 2',
      description: 'Description of Product 2',
      date_release: '2023-09-01',
      date_revision: '2023-09-15',
      logo: 'logo2.jpg'
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
      
      ],
      imports: [FormsModule,RouterTestingModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: () => of(mockProducts),
            deleteProduct: () => of({})
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information in the table', () => {
    component.products = mockProducts;
    fixture.detectChanges();
  
    const tableRows = fixture.nativeElement.querySelectorAll('.custom-table tbody tr');
    expect(tableRows.length).toBe(mockProducts.length);
  
    tableRows.forEach((row: any, index: number) => {
      const productName = mockProducts[index].name;
      const rowData = Array.from(row.cells).map((cell: any) => cell.textContent.trim());
      expect(rowData).toContain(productName);
    });
  });

  it('should navigate to add product page when "Agregar" button is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const addButton = fixture.nativeElement.querySelector('.add-button');
    addButton.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/products/create']);
  });

  it('should navigate to edit product page when "Editar" button is clicked', () => {
    const productToEdit = mockProducts[0]; 
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.goToEditProduct(productToEdit);
    expect(navigateSpy).toHaveBeenCalledWith([`/products/edit/${productToEdit.id}`], { state: { product: productToEdit } });
  });
  
  
  it('should show delete confirmation dialog when "Eliminar" button is clicked', () => {
    const productId = 'trc-3';
    component.showDialogDeleteProduct(productId);
    fixture.detectChanges();
    const confirmationDialog = fixture.nativeElement.querySelector('.confirmation-dialog');
    expect(confirmationDialog).toBeTruthy();
  });
  
 
  it('should cancel delete when confirmation dialog is canceled', () => {
    component.cancelDelete();
    expect(component['productToDeleteId']).toBeNull();
  });
  
  it('should update displayed products when search term is changed', () => {
    component.searchTerm = 'Product 1';
    component.onSearchChange();
    expect(component.displayedProducts.length).toBe(1);
    expect(component.displayedProducts[0].name).toBe('Product 1');
  });
  
  it('should update displayed products when page size is changed', () => {
    const event = new Event('change');
    const select = fixture.nativeElement.querySelector('select');
    select.value = '10';
    select.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.pageSize).toBe(10);
    expect(component.displayedProducts.length).toBe(2); // Since mockProducts has 2 items
  });
  
});

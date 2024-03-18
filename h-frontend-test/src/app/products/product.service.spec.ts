import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { Product } from './models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const dummyProducts: Product[] = [
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

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(dummyProducts.length);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should create a new product', () => {
    const dummyProductForCreate: Product = {
      id: 'trc-1',
      name: 'New Product',
      description: 'Description of the new product',
      date_release: '2023-09-01',
      date_revision: '2023-09-15',
      logo: 'new-product-logo.jpg'
    };

    service.createProduct(dummyProductForCreate).subscribe((createdProduct: Product) => {
      expect(createdProduct).toBeTruthy();
      expect(createdProduct.id).toEqual(dummyProductForCreate.id);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}`);
    expect(request.request.method).toBe('POST');

    request.flush(dummyProductForCreate);
  });

  it('should update an existing product', () => {
    const dummyProductForUpdate: Product = {
      id: 'trc-1',
      name: 'Updated Product',
      description: 'Updated description of the product',
      date_release: '2023-09-01',
      date_revision: '2023-09-15',
      logo: 'updated-product-logo.jpg'
    };

    service.updateProduct(dummyProductForUpdate).subscribe((updatedProduct: Product) => {
      expect(updatedProduct).toBeTruthy();
      expect(updatedProduct.id).toEqual(dummyProductForUpdate.id);
      expect(updatedProduct.name).toEqual(dummyProductForUpdate.name);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyProductForUpdate);
  });

  it('should delete a product', () => {
    const productIdToDelete = 'trc-1';
  
    service.deleteProduct(productIdToDelete).subscribe(() => {
    });
  
    const request = httpMock.expectOne(`${environment.apiUrl}?id=${productIdToDelete}`);
    expect(request.request.method).toBe('DELETE');
  
    request.flush({});
  });
  



});

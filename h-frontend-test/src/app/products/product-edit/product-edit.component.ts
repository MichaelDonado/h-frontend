import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productData!: Product;
  isValidProductId = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productData = history.state.product;
    if (!this.productData) {
      this.router.navigate(['/not-found']);
      return;
    }

    const productId = this.activateRoute.snapshot.paramMap.get('id') ?? '';

    // this.validateProductId(productId);
  }

  validateProductId(productId: string) {
    this.productService.verificationId(productId).pipe(
      tap((isValid: boolean) => {
        this.isValidProductId = isValid;
        if (!isValid) {
          this.router.navigate(['/not-found']);
        }
      }),
      catchError((error) => {
        console.error('Error verifying product ID:', error);
        return [];
      })
    ).subscribe();
  }

  onEditFormSubmit(formData: any) { }

}

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from './../product.service';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  displayedProducts: Product[] = [];
  private productToDeleteId: string | null = null;
  searchTerm: string = '';
  showDialog = false;
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  selectedItems: any[] = [];
  cols: Column[] = [];

  private productsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.selectedItems = [];
    this.cols = [
      { field: 'title', header: 'Titulo' },
      { field: 'type', header: 'Tipo' },
      { field: 'priority', header: 'Prioridad' },
  ];
  }

  loadProducts() {
    this.productsSubscription = this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  showOptions(event: Event, productId: string) {
    const target = event.target as HTMLElement;
    const productRow = target.closest('tr') as HTMLElement;
    const optionsDialog = productRow.querySelector('.options-dialog') as HTMLElement;

    if (optionsDialog) {
      optionsDialog.style.display = 'block';
    }

    window.addEventListener('click', (e: Event) => {
      const clickedElement = e.target as HTMLElement;
      if (!optionsDialog.contains(clickedElement) && clickedElement !== target) {
        optionsDialog.style.display = 'none';
      }
    });

    event.stopPropagation();
  }

  goToAddProduct() {
    this.router.navigate(['/products/create']);
  }


  goToEditProduct(product: Product) {
    this.router.navigate([`/products/edit/${product.id}`], { state: { product } });
  }

  showDialogDeleteProduct(productId: string) {
    this.productToDeleteId = productId;
    this.showDialog = true;
  }

  confirmDelete() {
    if (this.productToDeleteId) {
      console.log("🚀 ~ ProductListComponent ~ confirmDelete ~ this.productToDeleteId:", this.productToDeleteId)
      this.productService.deleteProduct(this.productToDeleteId).subscribe({
        next: (result) => {
          console.log('Producto eliminado:', result);
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });

      this.productToDeleteId = null;
      this.showDialog = false;
    }
  }

  cancelDelete() {
    this.productToDeleteId = null;
    this.showDialog = false;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  private taskUrl = `${this.apiUrl}/tasks`

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.taskUrl).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.taskUrl, productData).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.taskUrl}/update`, productData).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string): Observable<void> {
    const url = `${this.taskUrl}/delete`;

    return this.http.post<void>(url, {taskId:id}).pipe(
      catchError(this.handleError)
    );
  }

  verificationId(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/verification?id=${id}`;
    return this.http.get<boolean>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Server returned code ${error.status}, error is: ${error.error}, error message is: ${error.message}`;

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}

import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import Product from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:3001/products'

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ops, algo deu errado!')
    return EMPTY
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(map(obj => obj),
        catchError(e => this.errorHandler(e)))

  }

  read(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.baseUrl)

  }
  
  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)

  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)

  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)

  }

}
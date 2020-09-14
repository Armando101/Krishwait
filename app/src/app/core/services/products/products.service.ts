import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Product from '@core/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: Product[] = [];
  private url = 'https://us-central1-krishwait-3933a.cloudfunctions.net/api';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/getProducts`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/getProduct?idProduct=${id}`);
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/postProduct`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/product?idProduct=${id}`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product?idProduct=${id}`);
  }

}

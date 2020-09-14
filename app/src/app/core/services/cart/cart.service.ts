import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import Product from '@core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Product[] = [];
  public addCart = new BehaviorSubject<Product[]>([]);

  public cart$ = this.addCart.asObservable();

  constructor() {
    this.loadCart();
   }

  addProduct(product: Product): void {
    this.cart.push(product);
    this.saveCart();
  }

  removeProduct(deleteProduct: Product): number {
    const index = this.cart.findIndex(product => product.id === deleteProduct.id);
    // tslint:disable-next-line: no-unused-expression
    index >= 0 && this.cart.splice(index, 1);
    this.saveCart();
    return index;
  }

  getCart$(): Observable<Product> {
    return from(this.cart);
  }

  private saveCart(): void {
    const cartString = JSON.stringify(this.cart);
    localStorage.setItem('products', cartString);
    this.addCart.next(this.cart);
  }

  loadCart(): void {
    const cartArray = JSON.parse(localStorage.getItem('products'));
    // tslint:disable-next-line: no-unused-expression
    cartArray && (this.cart = cartArray);
    this.addCart.next(this.cart);
  }
}

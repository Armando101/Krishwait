import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '@core/services/cart/cart.service';
import { reduce, tap } from 'rxjs/operators';
import Product from '@core/models/product.model';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  public counter$: Observable<number>;
  public addCart = false;

  constructor(
    private cart: CartService,
    private route: Router
  ) { }

  ngOnInit(): void {

    if (this.route.url === '/products/cart') {
      this.counterProducts();
      this.addCart = true;
    }

  }

  private counterProducts(): void {
    this.counter$ = this.cart.getCart$()
    .pipe(
      reduce((acc: number, curr: Product): number => curr.id === this.product.id ? acc + 1 : acc, 0)
    );
  }

  addProduct(): void {
    this.cart.addProduct(this.product);
  }

  removeProduct(): void {
    this.cart.removeProduct(this.product);
    this.counterProducts();
  }
}

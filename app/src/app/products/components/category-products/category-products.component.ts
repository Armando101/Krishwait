import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '@core/services/products/products.service';
import { CartService } from '@core/services/cart/cart.service';

import Product from '@core/models/product.model';
import { distinct, reduce, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  public products: Product[] = [];
  public mount: Observable<number>;
  public cart = false;
  public titleHeader = 'Productos';
  public titleSubheader = 'Loading...';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/products/cart') {
      this.isCart();
    } else {
      this.productsService.getProducts().subscribe( (response: Product[]) => {
        this.products = response;
      });
    }
  }

  isCart(): void {
    this.cart = true;
    this.titleHeader = 'Carrito de compras';
    this.titleSubheader = 'Tu carrito está vacío';

    // Para evitar que muestra mas de una card con el mismo producto
    this.cartService.getCart$().pipe(distinct(product => product.id))
      .subscribe((products: Product) => {
        this.products.push(products);
      });

    // Para mostrar el monnto total del carrito
    this.mount = this.cartService.cart$.pipe
    (switchMap(_ => this.cartService.getCart$().pipe(reduce((acc, curr) => acc + curr.price, 0))));
  }
}

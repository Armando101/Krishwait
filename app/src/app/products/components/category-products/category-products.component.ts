import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '@core/services/products/products.service';
import { CartService } from '@core/services/cart/cart.service';

import Product from '@core/models/product.model';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  public products: Product[] = [];
  public titleHeader = 'Productos';
  public titleSubheader = 'Loading...';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/products/cart') {
      this.cartService.getCart$().pipe(distinct(product => product.id))
        .subscribe((products: Product) => {
          this.products.push(products);
        });
      this.titleHeader = 'Carrito de compras';
      this.titleSubheader = 'Tu carrito está vacío';
    } else {
      this.productsService.getProducts().subscribe( (response: Product[]) => {
        this.products = response;
      });
    }
  }
}

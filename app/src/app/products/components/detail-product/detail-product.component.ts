import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '@core/services/products/products.service';
import { CartService } from '@core/services/cart/cart.service';
import Product from '@core/models/product.model';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  public product$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
    .pipe(
      switchMap(({id}) => this.productsService.getProduct(id)),
      catchError(err => {
        console.error('Whoops something went wrong: ', err.message);
        this.router.navigateByUrl('/notFound');
        return null;
      })
    );

  }

  addCart(product: Product): void {
    this.cart.addProduct(product);
  }

}

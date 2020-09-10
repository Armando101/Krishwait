import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CategoryProductsComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }

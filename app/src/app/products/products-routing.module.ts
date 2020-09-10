import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryProductsComponent
  },
  {
    path: 'cart',
    component: CategoryProductsComponent
  },
  {
    path: 'detailProduct/:id',
    component: DetailProductComponent
  },
  {
    path: 'cart/detailProduct/:id',
    redirectTo: 'detailProduct/:id',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

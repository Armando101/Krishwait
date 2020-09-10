import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './administrator/services/auth.guard';

import { LayoutComponent } from './layout/layout.component';
import { NotFoundModule } from './not-found/not-found.module';
import { QuicklinkStrategy } from 'ngx-quicklink';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'administrator',
        loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => NotFoundModule)
  }
  // { path: 'home', component: CategoryProductsComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'detailProduct/:id', component: DetailProductComponent },
  // { path: 'cart', component: CategoryProductsComponent },

  // { path: 'administrator', component: DashboardComponent, canActivate: [ AuthGuard] },
  // { path: 'administrator/form', component: FormComponent, canActivate: [ AuthGuard] },
  // { path: 'administrator/table', component: TableComponent, canActivate: [ AuthGuard] },
  // { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

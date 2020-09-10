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
        path: 'administrator', canActivate: [AuthGuard],
        loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

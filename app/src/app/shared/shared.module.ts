import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';

import { HeaderComponent } from './header/header.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    QuicklinkModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404Component } from './error404/error404.component';

import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  declarations: [
    Error404Component,
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }

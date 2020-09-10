import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

import { AdministratorRoutingModule } from './administrator-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdministratorModule { }

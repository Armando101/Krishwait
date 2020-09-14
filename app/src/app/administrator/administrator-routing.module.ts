import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'form', component: FormComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'table', component: TableComponent },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }

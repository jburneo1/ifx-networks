import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionEmployeeComponent } from './components/employee/edition-employee/edition-employee.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EditionEntitiesComponent } from './components/entities/edition-entities/edition-entities.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'employee', component: EmployeeComponent, children: [
    {path: 'new', component: EditionEmployeeComponent},
    {path: 'edition/:id', component: EditionEmployeeComponent}
  ]},
  {path: 'entities', component: EntitiesComponent, children: [
    {path: 'new', component: EditionEntitiesComponent},
    {path: 'edition/:id', component: EditionEntitiesComponent}
  ]},

  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

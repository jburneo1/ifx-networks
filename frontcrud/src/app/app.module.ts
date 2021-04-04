import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { EmployeeComponent } from './components/employee/employee.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { HttpClientModule } from '@angular/common/http';
import { EditionEmployeeComponent } from './components/employee/edition-employee/edition-employee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditionEntitiesComponent } from './components/entities/edition-entities/edition-entities.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EntitiesComponent,
    EditionEmployeeComponent,
    EditionEntitiesComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from '../material/material.module';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [LoginPageComponent, LogoutButtonComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, MaterialModule, AppRoutingModule],
  exports: [LoginPageComponent, LogoutButtonComponent, RegisterComponent],
})
export class SecurityModule { }

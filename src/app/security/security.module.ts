import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from '../material/material.module';
import { LogoutButtonComponent } from './logout-button/logout-button.component';


@NgModule({
  declarations: [LoginPageComponent, LogoutButtonComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [LoginPageComponent, LogoutButtonComponent],
})
export class SecurityModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, FormsModule],
  exports: [LoginPageComponent],
})
export class SecurityModule { }

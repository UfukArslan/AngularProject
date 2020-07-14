import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [LoginPageComponent],
})
export class SecurityModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, FormsModule, MatSliderModule],
  exports: [LoginPageComponent],
})
export class SecurityModule { }

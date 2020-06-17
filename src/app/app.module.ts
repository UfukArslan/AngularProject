import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { SecurityModule } from './security/security.module';


@NgModule({
  declarations: [AppComponent, DummyPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SecurityModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

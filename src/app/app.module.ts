import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { SecurityModule } from './security/security.module';
import { ApiTokenInterceptorService } from './api/api-token-interceptor.service';


@NgModule({
  declarations: [AppComponent, DummyPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SecurityModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiTokenInterceptorService,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

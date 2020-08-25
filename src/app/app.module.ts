import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TripsPageComponent} from './trips-page/trips-page.component';
import { SecurityModule } from './security/security.module';
import { ApiTokenInterceptorService } from './api/api-token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { CreateTripComponent } from './trips-page/trips-page.component';
import { MapComponent } from './map/map.component';
import { PlacesMapComponent } from './places-map/places-map.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TemplateCardTripComponent } from './template-card-trip/template-card-trip.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { TemplateCardPlaceComponent } from './template-card-place/template-card-place.component';





@NgModule({
  declarations: [
    AppComponent, 
    TripsPageComponent, 
    CreateTripComponent, 
    MapComponent, 
    PlacesMapComponent, 
    TemplateCardTripComponent, 
    TemplateCardPlaceComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    SecurityModule, 
    BrowserAnimationsModule, 
    MaterialModule, 
    FormsModule, 
    LeafletModule,
    LeafletDrawModule,
    MatTabsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: ApiTokenInterceptorService,
    multi: true,
    
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

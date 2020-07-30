import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';
import { RegisterComponent } from './security/register/register.component';
import { MapComponent } from './map/map.component';
import { PlacesMapComponent } from './places-map/places-map.component';


const routes: Routes = [

  { path: "", redirectTo: "dummy", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "map", component: MapComponent },
  { path: "places", component: PlacesMapComponent },
  // Prevent access to this page to unauthenticated users
   {path: "dummy",component: DummyPageComponent,canActivate: [AuthGuard]},
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

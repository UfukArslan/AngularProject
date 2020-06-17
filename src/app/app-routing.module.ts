import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';


const routes: Routes = [

  { path: "", redirectTo: "dummy", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  {
    path: "dummy",
    component: DummyPageComponent,
    // Prevent access to this page to unauthenticated users
    canActivate: [AuthGuard],
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

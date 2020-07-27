import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';
import { RegisterComponent } from './security/register/register.component';


const routes: Routes = [

  { path: "", redirectTo: "dummy", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterComponent },
  // Prevent access to this page to unauthenticated users
  {path: "dummy",component: DummyPageComponent,canActivate: [AuthGuard]},
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

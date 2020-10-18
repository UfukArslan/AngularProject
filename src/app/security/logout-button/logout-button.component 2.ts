import { Component, OnInit } from '@angular/core';
import {AuthService } from '../auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  templateUrl: "./logout-button.component.html"
  //templateUrl: '<button (click)="logout()">Logout</button>',
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
}

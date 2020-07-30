import { Component, OnInit } from '@angular/core';
import {AuthService } from '../security/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {

  opened: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

}

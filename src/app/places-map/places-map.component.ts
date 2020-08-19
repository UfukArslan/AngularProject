import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { DataTransferService } from '../api/services/data-transfer.service';
import { Router } from '@angular/router';
import { ListTripsResponse } from '../models/list-trips-response';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {
  temp: ListTripsResponse;
  opened: boolean;

  constructor(private auth: AuthService, private router: Router, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.temp = this.dataTransferService.getData();  
    console.log(this.temp);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

}

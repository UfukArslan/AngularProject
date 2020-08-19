import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { DataTransferService } from '../api/services/data-transfer.service';
import { Router } from '@angular/router';
import { ListTripsResponse } from '../models/list-trips-response';
import { CreatePlaceRequest } from '../models/create-place-request';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {
  temp: ListTripsResponse;
  createPlaceRequest: CreatePlaceRequest;
  createPlaceRequestError: boolean;

  constructor(private auth: AuthService, private router: Router, private dataTransferService: DataTransferService) {
    this.createPlaceRequest = new CreatePlaceRequest();
    this.createPlaceRequestError = false;
    this.temp = this.dataTransferService.getData();  
   }

  ngOnInit(): void {
    console.log(this.temp.id);
    // console.log(this.createPlaceRequest.name);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  greeting: string;

}

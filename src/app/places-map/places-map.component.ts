import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { DataTransferService } from '../api/services/data-transfer.service';
import { DataTranferMapService } from "../api/services/data-tranfer-map.service";
import { Router } from '@angular/router';
import { ListTripsResponse } from '../models/list-trips-response';
import { CreatePlaceRequest } from '../models/create-place-request';
import { TemplateParseError } from '@angular/compiler';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {
  message: string;
  dataTransfer: ListTripsResponse;
  createPlaceRequest: CreatePlaceRequest;
  createPlaceRequestError: boolean;
  opened: boolean;

  constructor(private auth: AuthService, private router: Router, private dataTransferService: DataTransferService, private data: DataTranferMapService) {
    this.createPlaceRequest = new CreatePlaceRequest();
    this.createPlaceRequestError = false;
    this.dataTransfer = this.dataTransferService.getData();
    this.createPlaceRequest.tripId = this.dataTransfer.id;  
    this.createPlaceRequest.tripHref= this.dataTransfer.href;
   }

  ngOnInit(): void {
    console.log(this.dataTransfer);
    console.log(this.createPlaceRequest);
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);

    // console.log(this.createPlaceRequest.name);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

 console(){
   console.log(this.createPlaceRequest);
 
  
 }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { DataTransferTripIdService } from '../api/services/data-transfer-tripId.service';
import { DataTransferMarkerCoordService } from "../api/services/data-transfer-marker-coord.service";
import { Router } from '@angular/router';
import { ListTripsResponse } from '../models/list-trips-response';
import { CreatePlaceRequest } from '../models/create-place-request';
import { CreatePlaceService } from '../api/services/create-place.service';
import { ListPlacesService } from 'src/app/api/services/list-places.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ListPlacesResponse } from '../models/list-places-response';





@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {
  coord: any;
  dataTransferTripId: ListTripsResponse;
  createPlaceRequest: CreatePlaceRequest;
  createPlaceRequestError: boolean;
  listPlaces: ListPlacesResponse[];
  opened: boolean;
  // variables FormStepper ---------------------
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

 

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private dataTransferTripIdService: DataTransferTripIdService, 
    private dataTransferMarkerCoordService: DataTransferMarkerCoordService, 
    private createP: CreatePlaceService,
    private _formBuilder: FormBuilder,
    private listPlacesService: ListPlacesService,
    ){
    this.createPlaceRequest = new CreatePlaceRequest();
    this.createPlaceRequestError = false;
    this.dataTransferTripId = this.dataTransferTripIdService.getData(); // Get tripId for get request of the ListPlaces------------------------------
    this.createPlaceRequest.tripId = this.dataTransferTripId.id;  // Fill informations for postPlace()------------------------------
    this.createPlaceRequest.tripHref= this.dataTransferTripId.href;
   
   }

  ngOnInit(): void {
    // Between placeComponent and template cardComponent------------------------------
    this.dataTransferMarkerCoordService.currentMessage.subscribe(coord => this.coord = coord);
    // Form ---------------------------------------------------------------------------
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.listPlacesService.loadListPlaces(this.createPlaceRequest.tripId).subscribe({
      next: (listPlaces) => {this.listPlaces = listPlaces; console.log("Subscribe", this.listPlaces);}
      // next: (listTrips) => console.log("Subscribe", listTrips),
    });
  }
 
  console(){
    console.log(this.dataTransferTripId)
  }
  

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }


  addCoord(){
    this.createPlaceRequest.location.coordinates = this.coord;
  }


  postPlace(){
    this.createP.createdPlace(this.createPlaceRequest).subscribe({
      next: () => this.router.navigateByUrl("/trips"),
      error: (err) => {
        this.createPlaceRequestError = true;
        console.warn (`Anthentication failed: ${err.message}`);
      },
  })}

  

}

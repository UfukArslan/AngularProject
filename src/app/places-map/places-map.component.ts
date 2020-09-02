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
  dataTransferTripId: any;
  listPlaces: ListPlacesResponse[];
  createPlaceRequest: CreatePlaceRequest;
  createPlaceRequestError: boolean;
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
    // this.dataTransferTripId = this.dataTransferTripIdService.getData(); // Get tripId for get request of the ListPlaces------------------------------
    // this.createPlaceRequest.tripId = this.dataTransferTripId.id;  // Fill informations for postPlace()------------------------------
    // this.createPlaceRequest.tripHref= this.dataTransferTripId.href;
    // this.createPlaceRequest.name= this.dataTransferTripId.name;
    // this.createPlaceRequest.description= this.dataTransferTripId.description;
    // this.createPlaceRequest.location.coordinates = this.dataTransferTripId.location.coordinates;
    // this.createPlaceRequest.location.coordinates = this.coord;
  }
  
  ngOnInit(): void {
    // Between placeComponent and template cardComponent------------------------------
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

    this.dataTransferTripId = this.dataTransferTripIdService.getData();
    console.log("place-map/dataTransferTripID",this.dataTransferTripId);

    this.listPlacesService.loadListPlaces(this.dataTransferTripId.id).subscribe({
      next: (listPlaces) => {this.listPlaces = listPlaces; console.log("Subscribe/listPlaces", this.listPlaces);}
      // next: (listPlaces) => {this.listPlaces = listPlaces; console.log(this.createPlaceRequest);}
      // next: () => console.log("Subscribe", this.createPlaceRequest),
    });
    this.dataTransferMarkerCoordService.currentMessage.subscribe(coord => this.coord = coord);

  }
 
  console(){
    console.log("placesMap listPlace", this.listPlaces);
    console.log("placesMap dataTransferTrip", this.dataTransferTripId);
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

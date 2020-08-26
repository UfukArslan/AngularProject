import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { DataTransferService } from '../api/services/data-transfer.service';
import { DataTranferMapService } from "../api/services/data-tranfer-map.service";
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
  e: any;
  test: string;
  dataTransfer: ListTripsResponse;
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
    private dataTransferService: DataTransferService, 
    private data: DataTranferMapService, 
    private createP: CreatePlaceService,
    private _formBuilder: FormBuilder,
    private listPlacesService: ListPlacesService,
    ){
    this.createPlaceRequest = new CreatePlaceRequest();
    this.createPlaceRequestError = false;
    this.dataTransfer = this.dataTransferService.getData(); 
    this.createPlaceRequest.tripId = this.dataTransfer.id;  
    this.createPlaceRequest.tripHref= this.dataTransfer.href;
    this.test= "test";
   }

  ngOnInit(): void {
    console.log(this.test);
    this.listPlacesService.loadListPlaces(this.createPlaceRequest.tripId).subscribe({
      next: (listPlaces) => this.listPlaces = listPlaces,
      // next: (listTrips) => console.log(listTrips),
    });
    console.log(this.createPlaceRequest.tripId);
    // Between placeComponent and template cardComponent------------------------------
    this.data.currentMessage.subscribe(e => this.e = e);
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
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }


 addCoord(){
  this.createPlaceRequest.location.coordinates = this.e;
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

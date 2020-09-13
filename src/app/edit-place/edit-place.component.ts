import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EditPlaceRequest } from '../models/edit-place-request';
import { ListPlacesService } from 'src/app/api/services/list-places.service';
import { DataTransferEditPlaceService } from '../api/services/data-transfer-edit-place.service';
import { ListPlacesResponse } from '../models/list-places-response';
import { DataTransferMarkerCoordService } from '../api/services/data-transfer-marker-coord.service';
import { EditPlaceService } from '../api/services/edit-place.service';
import { OnePlaceResponse } from '../models/one-place-response';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { DataTransferTripIdService } from '../api/services/data-transfer-tripId.service';
import { DataTransferTripIdMarkerService } from '../api/services/data-transfer-tripId-marker.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.scss']
})
export class EditPlaceComponent implements OnInit {
  // place: EditPlaceRequest;
  dataTransferTripId: any;
  place: OnePlaceResponse;
  coord: any;
  editPlaceRequest: EditPlaceRequest;
  opened: boolean;
  // variables FormStepper ---------------------
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private dataTransferEditPlace: DataTransferEditPlaceService,
    private dataTransferMarkerCoordService: DataTransferMarkerCoordService, 
    private updatePlace: EditPlaceService,
    private dataTransferTripIdService: DataTransferTripIdService, 
    private dataTransferTripIdMarkerService: DataTransferTripIdMarkerService,
    private listPlacesService: ListPlacesService,
    ){ 
    this.editPlaceRequest = new EditPlaceRequest();
    }

  ngOnInit(): void {

        this.dataTransferTripId = this.dataTransferTripIdService.getData();
        console.log();
        this.dataTransferEditPlace.currentMessage.subscribe(place => {this.place = place; console.log(this.place)});
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
       
  }

  console(){
    // console.log(this.dataTransferTripId)
    console.log("Hello World")
  }


  addCoord(){
    this.editPlaceRequest.location.coordinates = this.coord;
  }

  // editPlace(){
  //   console.log(this.place)
  // }


  editPlace(){
    this.updatePlace.editplace(this.place.id, this.editPlaceRequest).subscribe({
      // next: () => {this.router.navigateByUrl("places"); console.log("hello")},
      // next: () => {this.dataTransferTripIdMarkerService.setData(this.place.location.coordinates); this.dataTransferTripIdService.setData(this.place);this.router.navigateByUrl("places"); console.log("hello")},
      next: () => {this.dataTransferTripIdService.setData(this.dataTransferTripId);
                  this.router.navigateByUrl("/places"); alert("Edited place");console.log(this.place)},
      // next: () => {this.listPlacesService.loadListPlaces(this.place.tripId);this.router.navigateByUrl("places"); console.log("hello")},
      // next: () => console.log(this.place.tripId),
      // next: () => this.location.replaceState(`${environment.apiUrl}/places`),
      error: (err) => { alert ("Error")},
  })}
  // editPlace(){
  //   this.createP.createdPlace(this.createPlaceRequest).subscribe({
  //     next: () => this.router.navigateByUrl("/trips"),
  //     error: (err) => {
  //       this.createPlaceRequestError = true;
  //       console.warn (`Anthentication failed: ${err.message}`);
  //     },
  // })}

}

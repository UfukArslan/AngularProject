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
          firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(14)]]
        });
        this.thirdFormGroup = this._formBuilder.group({
          thirdCtrl: ['', Validators.required]
        });
       
  }

  addCoord(){
    this.editPlaceRequest.location.coordinates = this.coord;
  }

  editPlace(){
    this.updatePlace.editplace(this.place.id, this.editPlaceRequest).subscribe({

      next: () => {this.dataTransferTripIdService.setData(this.dataTransferTripId);
                  this.router.navigateByUrl("/places"); alert("Edited place");console.log(this.place)},
      error: (err) => { alert ("Error")},
  })}

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListPlacesResponse } from '../models/list-places-response';
import { DeletedPlaceService } from '../api/services/deleted-place.service';
import { Router } from '@angular/router';
import { DataTransferEditPlaceService } from '../api/services/data-transfer-edit-place.service';
import { DataTransferTripIdService } from '../api/services/data-transfer-tripId.service';
import { CreatePlaceRequest } from '../models/create-place-request';
import { OnePlaceCoord } from '../models/one-place-coord-response';


@Component({
  selector: 'app-template-card-place',
  templateUrl: './template-card-place.component.html',
  styleUrls: ['./template-card-place.component.scss']
})
export class TemplateCardPlaceComponent implements OnInit {

  @Input() listPlaces: ListPlacesResponse;
  @Input() dataTransferTripId: any;
  @Input() createPlaceRequest: CreatePlaceRequest;
  @Output() deleted: EventEmitter<any>;


  constructor(
    private deletedPlaceService: DeletedPlaceService,
    private router: Router,
    private dataTransferEditPlace: DataTransferEditPlaceService,
    private dataTTripId: DataTransferTripIdService,
    ) {
      this.deleted = new EventEmitter();
    }

  ngOnInit(): void {
    console.log(this.listPlaces)
  }
  
  deletedPlace() {
    this.deletedPlaceService.removePlace(this.listPlaces.id).subscribe({
      next: () => { this.deleted.emit(), alert("Deleted Place")}
    });
  }
  
  editPlace () {
    this.router.navigateByUrl("/edit");
    this.dataTransferEditPlace.changeMessage(this.listPlaces);
    this.dataTTripId.setData(this.dataTransferTripId);
  }
  
  console(){

    console.log("templateCard. datatRansferTripId",this.dataTransferTripId)
    console.log("templateCardPlace, listPlaces",this.listPlaces)
  }
  
}

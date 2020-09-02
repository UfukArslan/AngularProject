import { Component, OnInit, Input } from '@angular/core';
import { ListPlacesResponse } from '../models/list-places-response';
import { DeletedPlaceService } from '../api/services/deleted-place.service';
import { Router } from '@angular/router';
import { DataTransferEditPlaceService } from '../api/services/data-transfer-edit-place.service';


@Component({
  selector: 'app-template-card-place',
  templateUrl: './template-card-place.component.html',
  styleUrls: ['./template-card-place.component.scss']
})
export class TemplateCardPlaceComponent implements OnInit {

  @Input() listPlaces: ListPlacesResponse;


  constructor(
    private deletedPlaceService: DeletedPlaceService,
    private router: Router,
    private dataTransferEditPlace: DataTransferEditPlaceService
    ) {}

  ngOnInit(): void {
  }
  
  deletedPlace() {
    this.deletedPlaceService.removePlace(this.listPlaces.id).subscribe({
      next: () => alert("DeletedPlace")
    });
  }
  
  editPlace () {
    this.router.navigateByUrl("/edit");
    this.dataTransferEditPlace.changeMessage(this.listPlaces);
  }
  
  console(){

    console.log("templateCard",this.dataTransferTripId)
    console.log("listPlaces",this.listPlaces)
  }
  
}

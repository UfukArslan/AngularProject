import { Component, OnInit, Input } from '@angular/core';
import { ListPlacesResponse } from '../models/list-places-response';
import { DeletedPlaceService } from '../api/services/deleted-place.service';


@Component({
  selector: 'app-template-card-place',
  templateUrl: './template-card-place.component.html',
  styleUrls: ['./template-card-place.component.scss']
})
export class TemplateCardPlaceComponent implements OnInit {

  @Input() listPlaces: ListPlacesResponse;

  constructor(
    private deletedPlaceService: DeletedPlaceService
    ) {}

  ngOnInit(): void {
  }

  deletedPlace() {
    this.deletedPlaceService.removePlace(this.listPlaces.id).subscribe({
      next: (deletedPlace) => alert("DeletedPlace")
    });
  }

 

}

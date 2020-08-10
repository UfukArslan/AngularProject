import { Component, OnInit, Input } from '@angular/core';
import { ListTripsResponse } from '../models/list-trips-response';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-template-card-trip',
  templateUrl: './template-card-trip.component.html',
  styleUrls: ['./template-card-trip.component.scss']
})
export class TemplateCardTripComponent implements OnInit {

  @Input() listTrips: ListTripsResponse;

  constructor() { }

  ngOnInit(): void {
    // console.log("listeT", this.listTrips);
  }

}

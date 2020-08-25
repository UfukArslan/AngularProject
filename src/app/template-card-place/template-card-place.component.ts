import { Component, OnInit, Input } from '@angular/core';
import { ListPlacesResponse } from '../models/list-places-response';
import { Router } from '@angular/router';


@Component({
  selector: 'app-template-card-place',
  templateUrl: './template-card-place.component.html',
  styleUrls: ['./template-card-place.component.scss']
})
export class TemplateCardPlaceComponent implements OnInit {

  @Input() listPlaces: ListPlacesResponse;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}

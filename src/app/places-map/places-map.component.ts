import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {

  opened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

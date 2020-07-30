import { Component } from "@angular/core";
import * as L from "leaflet";
import { Map } from "leaflet";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  name = 'Angular';
  options = {
	layers: [
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	],
	zoom: 13,
	center: L.latLng(46.778186, 6.641524)
};

onMapReady(map: Map): void {
    setTimeout(() => {
      map.invalidateSize();
    });
  }

}

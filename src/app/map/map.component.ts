import { Component } from "@angular/core";
import { defaultIcon } from './default-marker';
import * as L from "leaflet";
//import { Map } from "leaflet";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  name = 'Angular';
  map: L.Map;

  mapMarkers: L.Marker[];
  constructor(/* ... */) {
    // ...
    this.mapMarkers = [
      L.marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
      L.marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
      L.marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
    ];
  }


  options = {
	layers: [
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	],
	zoom: 13,
	center: L.latLng(46.778186, 6.641524)
};

onMapReady(map: L.Map): void {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
      console.log (`Map moved to ${center.lng}, ${center.lat}`);
    });
    setTimeout(() => {
      map.invalidateSize();
    });
  }

}

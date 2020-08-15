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
  
  mapMarkers: L.Marker[] = [];
  
  reservationArr : Array<object> = [];
  
  
  constructor() {}
  
  // -------------------------------------------------------------
  
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: L.latLng(46.778186, 6.641524)
  };
  
  // -------------------------------------------------------------
  
  
  onMapReady(map: L.Map): void {
    this.map = map;
    
    
    setTimeout(() => {
      map.invalidateSize();
    });
  }
  
  // Toolbar
  
  drawnItems: L.FeatureGroup = L.featureGroup();

  drawOptions = {

    position: 'topleft',
	  draw: {
		  marker: {
			  icon: L.icon({
			  	iconSize: [ 25, 41 ],
				  iconAnchor: [ 13, 41 ],
				  iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
			  	iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
				  shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
		    })
		  },
		  polyline: false,
		  circle: {
			  shapeOptions: {
				  color: '#d4af37'
			  }
		  },
		  rectangle: {
			  shapeOptions: {
				  color: '#85bb65'
			  }
		  }
    },
    
    edit: {
      featureGroup: this.drawnItems
    }
    
  };
  
  public onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as L.DrawEvents.Created).layer);
  }

  

// -------------------------------------------------------------

  layers = [
    // L.circle([ 46.778186, 6.641524 ], { radius: 5000 }),
    // L.polygon([[ 46.778186, 6.641524 ], [ 46.7728186, 6.5024 ], [ 46.778186, 6.20 ]]),
    L.marker([ 46.778186, 6.641524]),
  ];

// -------------------------------------------------------------

  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': L.circle([ 46.778186, 6.641524], { radius: 1000 }),
      'Big Square': L.polygon([[ 46.778186, 6.641524 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

}


// map.on('click', function () {
//   map.removeLayer(marker);
// });

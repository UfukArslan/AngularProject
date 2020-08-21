import { Component, OnInit } from "@angular/core";
import { defaultIcon } from "./default-marker";
import { DataTranferMapService } from "../api/services/data-tranfer-map.service";
import * as L from "leaflet";
import { map } from 'rxjs/operators';

//import { Map } from "leaflet";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  message: string;

  name = 'Angular';
  map: L.Map;
  
  mapMarkers: L.Marker[] = [];
  
  reservationArr : Array<object> = [];
  
  

  constructor(private data: DataTranferMapService) {}

  ngOnInit () {
    this.data.currentMessage.subscribe(message => this.message = message);

  }

  // BehaviorSubject-------------------------------------------------------------
  // newMessage () {
  //   this.data.changeMessage("Bienvenue dans l'univers des bisounours");
  // }

  
  // -------------------------------------------------------------
  
  
  // -------------------------------------------------------------
  
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: L.latLng(46.778186, 6.641524)
  };
  
  
  
  // Display map
  // -------------------------------------------------------------
  onMapReady(map: L.Map): void {
    this.map = map;
    
    
    setTimeout(() => {
      map.invalidateSize();
    });
  }
  
  Toolbar
  // -------------------------------------------------------------
  
  drawnItems: L.FeatureGroup = L.featureGroup();

  drawOptions = {

    position: 'topleft',
	  draw: {
		  marker: {
			  icon: defaultIcon
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
    this.data.changeMessage(e);
    // console.log(e.layer._latlng);
    // console.log ((e.layerType));
    console.log ((e.layerType));
    

    
  }

  json = JSON.stringify(this.drawnItems);

  // public onDrawCreated(e: any) {
  //   this.drawnItems.addLayer((e as L.DrawEvents.Created).layer);
  //  var geojson = this.drawnItems.toGeoJSON();
  //  console.log(geojson);
  // }
  

// -------------------------------------------------------------

  // layers = [
    // L.circle([ 46.778186, 6.641524 ], { radius: 5000 }),
    // L.polygon([[ 46.778186, 6.641524 ], [ 46.7728186, 6.5024 ], [ 46.778186, 6.20 ]]),
  //   L.marker([ 46.778186, 6.641524]),
  // ];

// -------------------------------------------------------------



// -------------------------------------------------------------

    //  in map.component.html put layersControl
  // layersControl = {
  //   baseLayers: {
  //     'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
  //     'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  //   },
  //   overlays: {
  //     'Big Circle': L.circle([ 46.778186, 6.641524], { radius: 1000 }),
  //     'Big Square': L.polygon([[ 46.778186, 6.641524 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
  //   }
  // }

}


// map.on('click', function () {
//   map.removeLayer(marker);
// });

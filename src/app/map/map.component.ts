import { Component, OnInit, Input } from "@angular/core";
import { defaultIcon } from "./default-marker";
import { DataTransferMarkerCoordService } from "../api/services/data-transfer-marker-coord.service";
import * as L from "leaflet";
import { map } from 'rxjs/operators';
import { ListPlacesResponse } from '../models/list-places-response';

//import { Map } from "leaflet";




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


  name = 'Angular';
  map: L.Map;
  
  mapMarkers: L.Marker[] = [];
  
  reservationArr : Array<object> = [];
  
  

  constructor(private dataTransferMarkerCoord: DataTransferMarkerCoordService) {

    this.mapMarkers = [
      L.marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
      L.marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
      L.marker([ 46.784992, 6.652267 ], { icon: defaultIcon }),
      L.marker([ 46.786015149092634, 6.650311946868897  ], { icon: defaultIcon })
    ];
  }

  ngOnInit () {
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
  
  // Toolbar-----------------------------------------------------
  
  
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

 


  
  public onDrawCreated(coord: any) {
    this.drawnItems.addLayer((coord as L.DrawEvents.Created).layer);
    this.dataTransferMarkerCoord.changeMessage([coord.layer._latlng.lat, coord.layer._latlng.lng] );
    // console.log(e.layer._latlng);
    // console.log ((e.layerType));
    // console.log ((e.layerType));
    

    
  }

  // json = JSON.stringify(this.drawnItems);s

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



















// ---++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// constructor() {
    
//   this.mapMarkers = [
//     L.marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
//     L.marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
//     L.marker([ 46.784992, 6.652267 ], { icon: defaultIcon }),
//     L.marker([ 46.786015149092634, 6.650311946868897  ], { icon: defaultIcon })
//   ];
// }


// options = {
// layers: [
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
// ],
// zoom: 13,
// center: L.latLng(46.778186, 6.641524)
// };

// onMapReady(map: L.Map): void {
//   this.map = map;
//   this.map.on('click', function(coord: L.LeafletMouseEvent){
//     var coord = coord;
//     var lat= coord.latlng.lat;
//     var lng= coord.latlng.lng;
//     L.marker([ lat, lng  ], { icon: defaultIcon }).addTo(map);
    
//   }); 
  
//   setTimeout(() => {
//     map.invalidateSize();
//   });
// }
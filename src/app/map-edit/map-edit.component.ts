import { Component, OnInit, Input } from "@angular/core";
import { defaultIcon } from "./default-marker";
import { DataTransferMarkerCoordService } from "../api/services/data-transfer-marker-coord.service";
import * as L from "leaflet";
import { ListTripsResponse } from '../models/list-trips-response';
import { DataTransferTripIdMarkerService } from '../api/services/data-transfer-tripId-marker.service';
import { ListPlacesMarkerService } from '../api/services/list-places-marker.service';




@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.scss']
})
export class MapEditComponent implements OnInit {

  centerPlace: [];
  name = 'Angular';
  map: L.Map;
  mapMarkers: L.Marker[] = [];
  reservationArr : Array<object> = [];
  dataTransferTripIdMarker: ListTripsResponse;

  constructor(
    private dataTransferMarkerCoord: DataTransferMarkerCoordService,  
    private dataTransferTripIdMarkerService: DataTransferTripIdMarkerService, 
    ){
    this.dataTransferTripIdMarker = this.dataTransferTripIdMarkerService.getData();
    this.mapMarkers = [];
    }

  ngOnInit () {}
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 7.6,
    center: L.latLng(46.818932, 8.179)
  };
  
  // Display map -------------------------------------------------------------
  onMapReady(map: L.Map): void {
    this.map = map;
    setTimeout(() => {
      map.invalidateSize();
    });
  }
  
  // Toolbar-----------------------------------------------------------------
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
  }
}

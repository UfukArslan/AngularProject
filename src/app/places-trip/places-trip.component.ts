import { Component } from "@angular/core";
import { UserService } from "../api/services/user.service";
import { FormControl } from '@angular/forms';
import { MatDialogActions, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { latLng, MapOptions, tileLayer} from 'leaflet';


@Component({
  selector: 'app-places-trip',
  templateUrl: './places-trip.component.html',
  styleUrls: ['./places-trip.component.scss']
})
export class PlacesTripComponent {
  mapOptions: MapOptions;


  constructor() {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
   }

  

}

import { Component, OnInit, Input } from '@angular/core';
import { ListTripsResponse } from '../models/list-trips-response';
import { EditTripRequest } from '../models/edit-trip-request';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataTransferTripIdService } from '../api/services/data-transfer-tripId.service';
import { DataTransferTripIdMarkerService } from '../api/services/data-transfer-tripId-marker.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTripService } from '../api/services/edit-trip.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DeletedTripService } from '../api/services/deleted-trip.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template-card-trip',
  templateUrl: './template-card-trip.component.html',
  styleUrls: ['./template-card-trip.component.scss']
})
export class TemplateCardTripComponent implements OnInit {
  

  @Input() listTrips: any;


  constructor(
    private router: Router, 
    private dataTransferTripIdService: DataTransferTripIdService, 
    private dataTransferTripIdMarkerService: DataTransferTripIdMarkerService,
    private dialog: MatDialog,
    private deletedTripService: DeletedTripService,
    private location: Location
    ){}

  ngOnInit(): void {
  }

  deletedTrip() {
    this.deletedTripService.removeTrip(this.listTrips.id).subscribe({
      next: () => {location.reload(true), alert("Deleted Trip")}
    });
  }

  console(){
    console.log(this.listTrips.id)
  }

  createPlace(){
  this.dataTransferTripIdService.setData(this.listTrips);
  this.dataTransferTripIdMarkerService.setData(this.listTrips);
  this.router.navigateByUrl("/places");
  }

  openEdit() {
    const tripsRef = this.dialog.open(EditTripComponent,{width: '500px', height: '350px',data:{ id: this.listTrips.id}});

    tripsRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

}

@Component({
  selector: 'app-editTrip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ["./edit-trip.component.scss"],
})
export class EditTripComponent {


  editTripRequest: EditTripRequest;
  editTripRequestError: boolean;

  constructor(
    private router: Router,
    private editT: EditTripService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.editTripRequest = new EditTripRequest();
      this.editTripRequestError = false;
    }

    console(){
      console.log(this.data.id)
    }

    onSubmit(form: NgForm) {
      // Only do something if the form is valid
      if (form.valid) {
        // Hide any previous login error.
        this.editTripRequestError = false;
  
        // Perform the request for register to the API.
        this.editT.editTrip(this.data.id, this.editTripRequest).subscribe({
          next: () => this.router.navigateByUrl("/"),
          error: (err) => {
            this.editTripRequestError = true;
            console.warn(`Authentication failed: ${err.message}`);
          },
        });
      }
    }


}

import { Component, OnInit, Input } from '@angular/core';
import { ListTripsResponse } from '../models/list-trips-response';
import { EditTripRequest } from '../models/edit-trip-request';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferTripIdService } from '../api/services/data-transfer-tripId.service';
import { DataTransferTripIdMarkerService } from '../api/services/data-transfer-tripId-marker.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTripService } from '../api/services/edit-trip.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DeletedTripService } from '../api/services/deleted-trip.service';


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
    
    ){console.log('constructore');}

  ngOnInit(): void {console.log('oninit');
  }

  deletedTrip() {
    this.deletedTripService.removeTrip(this.listTrips.id).subscribe({
      next: () => {location.reload(true), alert("Deleted Trip")},
      error: (err) => { alert(`ERROR`)}, 

    });
  }

  console(){
    console.log(this.listTrips.id)
  }

  createPlace(){
  this.dataTransferTripIdService.setData(this.listTrips);
  this.dataTransferTripIdMarkerService.setData(this.listTrips);
  this.router.navigateByUrl("/places");
  console.log(this.listTrips)
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
export class EditTripComponent implements OnInit {


  editTripRequest: EditTripRequest;
  editTripRequestError: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private router: Router,
    private editT: EditTripService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.editTripRequest = new EditTripRequest();
    this.editTripRequestError = false;
    }

    ngOnInit(): void {

      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]]
      });
  
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(14)]]
      });
  
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
          next: () => {location.reload(true), alert("Create Trip")},
          error: (err) => {
            this.editTripRequestError = true;
            alert("Error");
          },
        });
      }
    }


}

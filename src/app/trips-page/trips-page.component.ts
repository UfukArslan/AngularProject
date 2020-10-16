import { Component, OnInit } from "@angular/core";
import { UserService } from "../api/services/user.service";
import { FormControl } from '@angular/forms';
import { MatDialogActions, MatDialog } from '@angular/material/dialog';
import { CreateTripRequest } from '../models/create-trip-request';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatetripService } from '../api/services/createtrip.service';
import { ListTripsService } from '../api/services/list-trips.service';
import { SearchTripService } from '../api/services/search-trip.service';
import { ListTripsResponse } from '../models/list-trips-response';
import { SearchTripRequest } from '../models/search-trip-request';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



  //@title

@Component({
  selector: "app-trips-page",
  templateUrl: "./trips-page.component.html",
  styleUrls: ["./trips-page.component.scss"],
})
export class TripsPageComponent implements OnInit {

  // Dialog
  opened: boolean;

  // Filter
  myControl = new FormControl();
  listTrips: ListTripsResponse[];
  filteredListTrips: Observable<ListTripsResponse[]>
  searchTrip: SearchTripRequest;

  
  // Inject the UserService
  constructor(
    private dialog: MatDialog, 
    private listTripsService: ListTripsService,
    private searchTripService: SearchTripService,
    private router: Router,
   
  
    ) {}

  ngOnInit(): void {

  
  

    this.listTripsService.loadListTrips().subscribe({
      next: (listTrip) => { this.listTrips = listTrip, 
                            console.log("observalbloadlist",this.listTrips),  
                            this.filteredListTrips = this.myControl.valueChanges.pipe(
                                                                                      startWith(''),
                                                                                      map(value => this._filter(value)),
                                                                                     )
                                                                                    },
      error: (error) => console.warn(error)
    });

  
  }

  _filter (value: any) : any[] {
    const filterValue = value.toLowerCase();
    return this.listTrips.filter(listTrip => listTrip.title.toLowerCase().includes(filterValue));
  }


   retrieveTrip() {
    this.searchTripService.searchTrip(this.myControl.value).subscribe({
      next: (listTrip) =>  this.listTrips = listTrip, 
      error: (err) => { alert(`Authentication failed: ${err.message}`);
      },
    });
  }

  openDialog() {
    const tripsRef = this.dialog.open(CreateTripComponent,{width: '500px', height: '350px'});

    tripsRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  console(){
    console.log(this.myControl.value);
  }

  displayFn(subject: any){
    return subject ? subject.title : undefined;
  }

  
}

@Component({
  selector: 'app-createTrip',
  templateUrl: './create-trip.component.html',
  styleUrls: ["./create-trip.component.scss"],
})
export class CreateTripComponent implements OnInit {


  createTripRequest: CreateTripRequest;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

 
  createTripRequestError: boolean;

  constructor(
    private createT: CreatetripService, 
    private router: Router,
    private _formBuilder: FormBuilder
    ){
    this.createTripRequest = new CreateTripRequest();
    this.createTripRequestError = false;
    }

    ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(14)]]
    });

    }

  onSubmit(form: NgForm) {
   
    if (form.valid) {
  
      this.createTripRequestError = false;

      this.createT.createdTrip(this.createTripRequest).subscribe({
        next: () => {location.reload(true),alert("Create trip")},
        error: (err) => {
          this.createTripRequestError = true;
          alert("Error");
        },
      });
    }
  }
  
}




import { Component, OnInit } from "@angular/core";
import { UserService } from "../api/services/user.service";
import { FormControl } from '@angular/forms';
import { MatDialogActions, MatDialog } from '@angular/material/dialog';
import { CreateTripRequest } from '../models/create-trip-request';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
    private router: Router
    ) {}

  ngOnInit(): void {
  

    this.listTripsService.loadListTrips().subscribe({
      next: (listTrip) => { this.listTrips = listTrip, 
                            console.log("observalbloadlist",this.listTrips),  
                            this.filteredListTrips = this.myControl.valueChanges.pipe(
                                                                                      startWith(''),
                                                                                      map(value => this._filter(value))
                                                                                     )},
      // next: (listTrips) => console.log(listTrips),
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
export class CreateTripComponent {

      /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  createTripRequest: CreateTripRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  createTripRequestError: boolean;

  constructor(private createT: CreatetripService, private router: Router) {
    this.createTripRequest = new CreateTripRequest();
    this.createTripRequestError = false;
  }


  

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.createTripRequestError = false;

      // Perform the request for register to the API.
      this.createT.createdTrip(this.createTripRequest).subscribe({
        next: () => this.router.navigateByUrl("/trips"),
        error: (err) => {
          this.createTripRequestError = true;
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    }
  }
  
}




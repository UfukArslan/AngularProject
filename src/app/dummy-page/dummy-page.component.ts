import { Component, OnInit } from "@angular/core";
import { UserService } from "../api/services/user.service";
import {FormControl} from '@angular/forms';
import { MatDialogActions, MatDialog } from '@angular/material/dialog';
import { CreateTripRequest } from '../models/create-trip-request';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CreatetripService } from './createtrip.service';

  //@title

@Component({
  selector: "app-dummy-page",
  templateUrl: "./dummy-page.component.html",
  styleUrls: ["./dummy-page.component.scss"],
})
export class DummyPageComponent implements OnInit {
  
  opened: boolean;

  


  // Inject the UserService
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.userService.loadAllUsers().subscribe({
      next: (users) => console.log("Users", users),
      error: (error) => console.warn("Error", error),
    });
  }

  openDialog() {
    const dummyRef = this.dialog.open(CreateTripComponent,{width: '500px', height: '350px'});

    dummyRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
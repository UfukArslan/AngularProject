import { Component, OnInit } from "@angular/core";
import { CreateTripRequest } from "../models/create-trip-request";
//import { AuthService } from "../auth.service";
//import { RegisterService } from "../register.service";
//import { UserService } from "../api/services/user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { CreatetripService } from './createtrip.service';


@Component({
  selector: "app-register",
  templateUrl: "./create-trip.component.html",
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
        next: () => this.router.navigateByUrl("../login"),
        error: (err) => {
          this.createTripRequestError = true;
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    }
  }
}
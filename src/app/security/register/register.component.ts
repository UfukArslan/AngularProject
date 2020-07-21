import { Component, OnInit } from "@angular/core";
import { RegisRequest } from "../../models/regis-request";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  regisRequest: RegisRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  registerError: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.regisRequest = new RegisRequest();
    this.registerError = false;
  }
  

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      // Hide any previous login error.
      this.registerError = false;

      // Perform the authentication request to the API.
      this.auth.register(this.regisRequest).subscribe({
        next: () => this.router.navigateByUrl("/"),
        error: (err) => {
          this.registerError = true;
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    }
  }
}
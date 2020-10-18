import { Component, OnInit } from "@angular/core";
import { RegisRequest } from "../../models/regis-request";
import { AuthService } from "../auth.service";
import { RegisterService } from "../register.service";
import { Router } from "@angular/router";
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  regisRequest: RegisRequest;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  registerError: boolean;

  constructor(
    private regis: RegisterService, 
    private router: Router,
    private _formBuilder: FormBuilder,
    ){
    this.regisRequest = new RegisRequest();
    this.registerError = false;
  }

  ngOnInit(): void {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
      });

      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', [Validators.required, Validators.minLength(4)]]
      });

    }
  

  onSubmit(form: NgForm) {

    if (form.valid) {

      this.registerError = false;

      this.regis.register(this.regisRequest).subscribe({
        next: () => {this.router.navigateByUrl("/login"), alert("User registered")},
        error: (err) => {
          this.registerError = true;
          alert(`Error`);
        },
      });
    }
  }
}
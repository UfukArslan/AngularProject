import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EditPlaceRequest } from '../models/edit-place-request';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.scss']
})
export class EditPlaceComponent implements OnInit {
  coord: any;
  editPlaceRequest: EditPlaceRequest;
  opened: boolean;
  // variables FormStepper ---------------------
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
    ){ 
    this.editPlaceRequest = new EditPlaceRequest();
    }

  ngOnInit(): void {
        // Form ---------------------------------------------------------------------------
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
          thirdCtrl: ['', Validators.required]
        });
       
  }

  console(){
    // console.log(this.dataTransferTripId)
    console.log("Hello World")
  }
  

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }


  addCoord(){
    this.editPlaceRequest.location.coordinates = this.coord;
  }


  // postPlace(){
  //   this.createP.createdPlace(this.createPlaceRequest).subscribe({
  //     next: () => this.router.navigateByUrl("/trips"),
  //     error: (err) => {
  //       this.createPlaceRequestError = true;
  //       console.warn (`Anthentication failed: ${err.message}`);
  //     },
  // })}

}

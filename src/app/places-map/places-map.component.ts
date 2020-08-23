import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { DataTransferService } from '../api/services/data-transfer.service';
import { DataTranferMapService } from "../api/services/data-tranfer-map.service";
import { Router } from '@angular/router';
import { ListTripsResponse } from '../models/list-trips-response';
import { CreatePlaceRequest } from '../models/create-place-request';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent implements OnInit {
  e: any;

  
  dataTransfer: ListTripsResponse;
  createPlaceRequest: CreatePlaceRequest;
  createPlaceRequestError: boolean;
  opened: boolean;
 

  constructor(private auth: AuthService, private router: Router, private dataTransferService: DataTransferService, private data: DataTranferMapService) {
    this.createPlaceRequest = new CreatePlaceRequest();
  
    this.createPlaceRequestError = false;
    this.dataTransfer = this.dataTransferService.getData();
    this.createPlaceRequest.tripId = this.dataTransfer.id;  
    this.createPlaceRequest.tripHref= this.dataTransfer.href;
   }

  ngOnInit(): void {
    // console.log(this.dataTransfer);
    // console.log(this.createPlaceRequest);
    this.data.currentMessage.subscribe(e => this.e = e);
    // this.createPlaceRequest.location = "helloWorld";
    // console.log(this.e);

    // console.log(this.createPlaceRequest.name);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  // const monObservable = new Observable ((observer) => {
  //   let listOFFriends = ["Damine", "Thomas", "Jean-Claude Dusse"];
  //   listOFFriends.forEach((friends: string) => {
  //     observer.next(friends);
  //   })
  //   observer.complete();
    
  // });

  // monObservable.subscribe({
  //   next(x) { console.log('got value ' + x); },
   
  // });

  observable = new Observable<any>(subscriber => {
    subscriber.next(this.e);
    // subscriber.next(3);
    // subscriber.next(3);
  });

  

  
  



 console(){
  // this.createPlaceRequest.location = this.e.layerType;
  //  console.log(this.e);
  // console.log(this.createPlaceRequest.location.type);


  this.observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
  });


  
  
 
  
 }

}

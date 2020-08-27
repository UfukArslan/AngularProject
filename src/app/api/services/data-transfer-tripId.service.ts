import { Injectable } from '@angular/core';
import { ListTripsResponse } from 'src/app/models/list-trips-response';

@Injectable({
  providedIn: 'root'
})
export class DataTransferTripIdService {

  data: ListTripsResponse;
  
  constructor() { }

  setData(data: ListTripsResponse) {
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }


}




import { Injectable } from '@angular/core';
import { EditTripRequest } from '../../models/edit-trip-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EditTripService {

  constructor(private http: HttpClient) { }

  editTrip ( id: any, editTrip: EditTripRequest){
    return this.http.patch<EditTripRequest>(`${environment.apiUrl}/trips/${id}`, editTrip);
  }

}

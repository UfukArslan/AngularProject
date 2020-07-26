import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CreateTripRequest } from '../models/create-trip-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatetripService {

  private createdTrip$: ReplaySubject<CreateTripRequest>;

  constructor(private http: HttpClient) {
   }

   createdTrip (createTrip: CreateTripRequest) {
     return this.http.post<CreateTripRequest>(`${environment.apiUrl}/trips`, createTrip);
   }

}

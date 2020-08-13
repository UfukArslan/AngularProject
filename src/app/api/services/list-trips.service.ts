import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListTripsResponse } from 'src/app/models/list-trips-response';

@Injectable({
  providedIn: 'root'
})
export class ListTripsService {

  constructor(private http: HttpClient) { }

  loadListTrips(): Observable<ListTripsResponse[]> { 
    return this.http.get<ListTripsResponse[]>(`${environment.apiUrl}/trips`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchTripResponse } from 'src/app/models/search-trip-response';


@Injectable({
  providedIn: 'root'
})
export class SearchTripService {

  constructor(private http: HttpClient) { }

  searchTrip (title: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/trips?title=${title}`);
  }
}

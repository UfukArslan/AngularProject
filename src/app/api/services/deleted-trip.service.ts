import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletedTripService {

  constructor(private http: HttpClient) {}

  removeTrip(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/trips/${id}`);
  }
}

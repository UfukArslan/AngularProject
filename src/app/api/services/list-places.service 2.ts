import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListPlacesResponse } from 'src/app/models/list-places-response';


@Injectable({
  providedIn: 'root'
})
export class ListPlacesService {

  constructor(private http: HttpClient) { }

  loadListPlaces(id: any): Observable<ListPlacesResponse[]> {
    return this.http.get<ListPlacesResponse[]>(`${environment.apiUrl}/places?trip=${id}`);
  }
}

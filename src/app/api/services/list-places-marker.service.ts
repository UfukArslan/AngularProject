import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListPlacesResponse } from 'src/app/models/list-places-response';
import { CreatePlaceRequest } from 'src/app/models/create-place-request';
import { map } from 'rxjs/operators';
import { Coord } from 'src/app/models/create-place-coord-request';


@Injectable({
  providedIn: 'root'
})
export class ListPlacesMarkerService {

  constructor(private http: HttpClient) { }

  loadListPlaces(id: String): Observable<any> {
    return this.http
      .get<CreatePlaceRequest[]>(`${environment.apiUrl}/places?trip=${id}`)
      .pipe(  
        map( CreatePlaceRequest => CreatePlaceRequest.map(CreatePlaceRequest => CreatePlaceRequest.location.coordinates))
      );
  }
}



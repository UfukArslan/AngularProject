import { Injectable } from '@angular/core';
import { CreatePlaceRequest } from '../../models/create-place-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatePlaceService {

  constructor(private http: HttpClient) { }

  createdPlace(createPlace: CreatePlaceRequest) {
    return this.http.post<CreatePlaceRequest>(`${environment.apiUrl}/places`, createPlace);
  }
}

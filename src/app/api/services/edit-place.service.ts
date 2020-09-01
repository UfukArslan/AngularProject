import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EditPlaceRequest } from 'src/app/models/edit-place-request';

@Injectable({
  providedIn: 'root'
})
export class EditPlaceService {

  constructor(private http: HttpClient) { }

  editplace(id: String, editPlaceRequest: EditPlaceRequest): Observable<EditPlaceRequest>{
    return this.http.patch<EditPlaceRequest>(`${environment.apiUrl}/places/${id}`, editPlaceRequest);
  }
}

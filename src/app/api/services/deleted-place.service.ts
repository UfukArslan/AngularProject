import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletedPlaceService {

  constructor(private http: HttpClient) {}

  removePlace(id): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/places/${id}`);
  }


}

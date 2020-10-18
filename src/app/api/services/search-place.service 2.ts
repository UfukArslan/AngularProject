import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchPlaceService {

  constructor(private http: HttpClient) {}
    
    searchPlace (name: string, id: string): Observable<any> {
      if (name == '') 
      {
        return this.http.get<any>(`${environment.apiUrl}/places?trip=${id}`);
      }
      else (typeof name == 'string')
      {
        return this.http.get<any>(`${environment.apiUrl}/places?name=${name}`);
      }
  }
}



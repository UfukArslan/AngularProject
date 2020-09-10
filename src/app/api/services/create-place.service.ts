import { Injectable } from '@angular/core';
import { CreatePlaceRequest } from '../../models/create-place-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CreatePlaceService {

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get RefreshNeeded$(){
    return this._refreshNeeded$;
  }

  createdPlace(createPlace: CreatePlaceRequest): Observable<CreatePlaceRequest>{
    return this.http
      .post<CreatePlaceRequest>(`${environment.apiUrl}/places`, createPlace)
      .pipe (
            tap(()=> { 
              this._refreshNeeded$.next();
            })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ListTrips } from 'src/app/models/list-trips-request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListTripsService {

  constructor(private http: HttpClient) { }


  //  A MODIFIER SELON LES REQUETES OU LES REPONSES DE LA REQUETE
  loadListTrips(): Observable<ListTrips[]> { 
    return this.http.get<ListTrips[]>(`${environment.apiUrl}/trips`);
  }

}

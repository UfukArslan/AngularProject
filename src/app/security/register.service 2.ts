import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "../../environments/environment";
import { RegisRequest } from '../models/regis-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private registered$: ReplaySubject<User>;

  constructor(private http: HttpClient) {


   }

  register (regisRequest: RegisRequest){
    return this.http.post<RegisRequest>(`${environment.apiUrl}/users`, regisRequest);
      
  }

 
}

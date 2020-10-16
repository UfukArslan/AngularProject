import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { environment} from "../../../environments/environment"
import { AuthRequest } from 'src/app/models/auth-request';


const apiUrl = "<REPLACE_ME>";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  registerNew(newUser: AuthRequest): Observable<AuthRequest> {
    return this.http.post<AuthRequest>(`${environment.apiUrl}/users`, newUser);
  }

   
}

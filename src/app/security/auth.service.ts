import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { AuthResponse } from "../models/auth-response";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { AuthRequest } from "../models/auth-request";

// TODO: Insert here your personnal api URL
const apiUrl = "<REPLACE_ME>";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * A "ReplaySubject" is a Subject (a source of an Observable) that emits a predefined number of previously emitted
   * values to an Observer when it subscribes to it.
   * It will act as a sort of local "cache" for the AuthResponse object value.
   */
  private authenticated$: ReplaySubject<AuthResponse>;

  constructor(private http: HttpClient) {
    // Create the ReplaySubject and configure it so that it emits the latest emitted value on each subscription
    this.authenticated$ = new ReplaySubject(1);
    // Emit a null value as the initial value
    this.authenticated$.next(null);
  }

  /**
   * Checks if the user is authenticated by casting the latest AuthResponse value as a boolean
   */
  isAuthenticated(): Observable<boolean> {
    return this.authenticated$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * Retrieves the User object from the latest AuthResponse value
   */
  getUser(): Observable<User> {
    return this.authenticated$.pipe(
      map((auth) => (auth ? auth.user : undefined))
    );
  }

  /**
   * Retrieves the token string from the latest AuthResponse value
   */
  getToken(): Observable<string> {
    return this.authenticated$.pipe(
      map((auth) => (auth ? auth.token : undefined))
    );
  }

  /**
   * Logs in a user with the provided AuthRequest object and emits the received AuthResponse if successful.
   */
  login(authRequest: AuthRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${apiUrl}/auth`, authRequest).pipe(
      map((response) => {
        this.authenticated$.next(response);
        console.log(`User ${response.user.name} logged in`);
        return response.user;
      })
    );
  }

  /**
   * Logs out a user and emit an empty AuthResponse
   */
  logout() {
    this.authenticated$.next(null);
    console.log("User logged out");
  }
}

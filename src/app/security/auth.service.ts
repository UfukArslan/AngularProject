import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { AuthResponse } from "../models/auth-response";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { User } from "../models/user";
import { AuthRequest } from "../models/auth-request";

// TODO: Insert here your personnal api URL
const apiUrl = "https://masrad-2020-tl-ufuk.herokuapp.com/api";
const STORAGE_KEY = "auth";

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
    const savedAuth = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) as AuthResponse;
    // Create the ReplaySubject and configure it so that it emits the latest emitted value on each subscription
    this.authenticated$ = new ReplaySubject(1);
    // Emit a null value as the initial value
    this.authenticated$.next(savedAuth);
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
      // The tap operator allows you to do something with an observable's emitted value
      // and emit it again unaltered.
      // In our case, we just store this AuthResponse in the localStorage
      tap((response) => this.saveAuth(response)),
      map((response) => {
        // ...
      })
    );
  }

  /**
   * Logs out a user and emit an empty AuthResponse
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  private saveAuth(auth: AuthResponse) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }
}



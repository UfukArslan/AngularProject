import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../security/auth.service";
import { switchMap, first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiTokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve AuthService on method invocation from the Angular injector.
    // (Otherwise there would be a circular dependency:
    //  AuthInterceptorProvider -> AuthService -> HttpClient -> AuthInterceptorProvider).
    const auth = this.injector.get(AuthService);

    // Get the auth token, if any
    return auth.getToken().pipe(
      first(),
      switchMap((token) => {
        // If the token exists and the header does not...
        if (token && !req.headers.has("Authorization")) {
          // Clone the actual request and add it the header
          req = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`),
          });
        }
        // Process this updated request
        return next.handle(req);
      })
    );
  }
}

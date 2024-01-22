import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { GlobalStateService } from "../services/global-state.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _globalStateService: GlobalStateService
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = 'Something bad happened; please try again later.'
    this._globalStateService.error.set(errorMessage);
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(errorMessage));
  }
} 
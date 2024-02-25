import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CommonStateService } from '../services/common-state.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _commonStateService: CommonStateService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this._handleError));
  }

  private _handleError = (error: HttpErrorResponse): Observable<never> => {
    const errorMessage = 'Something bad happened, please try again later.';
    this._commonStateService.setError(errorMessage);
    if (error.status === 0) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}`);
    }
    return throwError(() => new Error(errorMessage));
  };
}

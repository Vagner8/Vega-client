import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CommonActsService } from '@services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _commonActsService: CommonActsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this._handleError));
  }

  private _handleError = (error: HttpErrorResponse): Observable<never> => {
    const errorMessage = 'Something bad happened, please try again later.';
    this._commonActsService.error.set(errorMessage);
    if (error.status === 0) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned code ${error.status}`);
    }
    return throwError(() => new Error(errorMessage));
  };
}

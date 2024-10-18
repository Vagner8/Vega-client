import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '@services';
import { ex } from '@utils';

export const fetchInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const ss = inject(ErrorService);
  return next(req).pipe(catchError(error => handleError(ss, error)));
};

export const handleError = (es: ErrorService, error: HttpErrorResponse): Observable<never> => {
  es.error.set(ex(error));
  console.error('🚀 ~ Error:', error.error);
  return throwError(() => new Error(error.error));
};

import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { StateService } from '@services';
import { ex } from '@utils';

export const fetchInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const ss = inject(StateService);
  ss.isFetching.set(true);
  return next(req).pipe(
    catchError((error) => handleError(ss, error)),
    finalize(() => ss.isFetching.set(false)),
  );
};

export const handleError = (ss: StateService, error: HttpErrorResponse): Observable<never> => {
  ss.error.set(ex(error));
  console.error('🚀 ~ dima:', error.error);
  return throwError(() => new Error(error.error));
};

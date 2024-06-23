import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StateService } from '@services';

export const fetchInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const ss = inject(StateService);
  ss.isFetching.set(true);
  return next(req).pipe(
    catchError((error) => handleError(ss, error)),
    tap(() => ss.isFetching.set(false)),
  );
};

const handleError = (ss: StateService, error: HttpErrorResponse): Observable<never> => {
  console.log('🚀 ~ error:', error);
  ss.isFetching.set(false);
  const errorMessage = 'Something bad happened, please try again later.';
  ss.error.set(errorMessage);
  if (error.status === 0) {
    console.error('An error occurred:', error.message);
  } else {
    console.error(`Backend returned code ${error.status}`);
  }
  return throwError(() => new Error(errorMessage));
};

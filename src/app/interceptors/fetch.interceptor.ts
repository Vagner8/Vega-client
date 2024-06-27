import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { SnackBarService, StateService } from '@services';

export const fetchInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const ss = inject(StateService);
  const sbs = inject(SnackBarService);
  ss.isFetching.set(true);
  return next(req).pipe(
    catchError((error) => handleError(ss, sbs, error)),
    finalize(() => {
      ss.isFetching.set(false);
    }),
  );
};

export const handleError = (
  ss: StateService,
  sbs: SnackBarService,
  error: HttpErrorResponse,
): Observable<never> => {
  console.log('🚀 ~ error:', error);
  const errorMessage = 'Error: Reload the page.';
  ss.error.set(errorMessage);
  sbs.error();
  if (error.status === 0) {
    console.error('An error occurred:', error.message);
  } else {
    console.error(`Backend returned code ${error.status}`);
  }
  return throwError(() => new Error(errorMessage));
};

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalStateService } from '@services';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private _globalStateService: GlobalStateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (!(event instanceof HttpResponse)) return;
        if (event.body.result) return;
        const errorMessage = `Result is ${event.body.result}`;
        this._globalStateService.error.set(errorMessage);
        throw new Error(errorMessage);
      })
    );
  }
}

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ErrorInterceptor } from '@interceptors';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTokens } from './tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTokens(),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimations(),
  ],
};

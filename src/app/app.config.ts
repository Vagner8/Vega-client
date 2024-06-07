import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ErrorInterceptor } from '@interceptors';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTokens } from '@utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTokens(),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
  ],
};

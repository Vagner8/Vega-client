import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fetchInterceptor } from '@interceptors';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([fetchInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
  ],
};

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PathParams } from '@types';
import { PAGES } from '@constants';

export const fractalGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return Object.prototype.hasOwnProperty.call(PAGES, next.params[PathParams.Page])
    ? true
    : router.createUrlTree([PAGES.HOME]);
};

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PathParam } from '@types';
import { FRACTAL_NAMES } from '@constants';

export const fractalGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return FRACTAL_NAMES.includes(next.params[PathParam.Page])
    ? true
    : router.createUrlTree(['Home']);
};

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Param } from '@types';
import { FRACTAL_NAMES } from 'app/utils/constants';

export const fractalGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return FRACTAL_NAMES.includes(next.params[Param.Fractal]) ? true : router.createUrlTree(['Home']);
};

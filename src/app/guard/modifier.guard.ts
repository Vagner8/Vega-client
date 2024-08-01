import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Param } from '@types';
import { MODIFIERS_NAMES } from 'app/utils/constants';

export const modifierGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return MODIFIERS_NAMES.includes(next.params[Param.Modifier])
    ? true
    : router.createUrlTree(['Home']);
};

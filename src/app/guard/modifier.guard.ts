import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PathParam } from '@types';
import { MODIFIERS_NAMES } from '@constants';

export const modifierGuard: CanActivateFn = (next) => {
  const router = inject(Router);
  return MODIFIERS_NAMES.includes(next.params[PathParam.Modifier])
    ? true
    : router.createUrlTree(['Home']);
};

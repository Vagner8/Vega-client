import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PathParams } from '@types';
import { MODIFIERS, PAGES } from '@constants';

export const modifierGuard: CanActivateFn = (next) => {
  const router = inject(Router);
  return Object.prototype.hasOwnProperty.call(MODIFIERS, next.params[PathParams.Modifier])
    ? true
    : router.createUrlTree([PAGES[0]]);
};

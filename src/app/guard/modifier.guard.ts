import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Pages, Roots } from '@types';
import { isModifierName } from '@utils';

export const modifierGuard: CanActivateFn = next => {
  const router = inject(Router);
  return isModifierName(next.params[Roots.Modifiers]) ? true : router.createUrlTree([Pages.Home]);
};

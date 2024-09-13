import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FractalPagesNames, PathParams } from '@types';
import { isModifierName } from '@utils';

export const modifierGuard: CanActivateFn = next => {
  const router = inject(Router);
  return isModifierName(next.params[PathParams.Modifier])
    ? true
    : router.createUrlTree([FractalPagesNames.Home]);
};

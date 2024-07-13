import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Param, TapPagesNames } from '@types';

export const pages: TapPagesNames[] = ['Home', 'Users', 'Products'];

export const pageGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return pages.includes(next.params[Param.Page]) ? true : router.createUrlTree([pages[0]]);
};

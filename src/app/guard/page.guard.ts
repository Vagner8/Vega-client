import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Pages, Roots } from '@types';
import { isPageName } from '@utils';

export const pageGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return isPageName(next.params[Roots.Pages]) ? true : router.createUrlTree([Pages.Home]);
};

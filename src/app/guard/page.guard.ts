import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { PAGES } from '@constants';
import { PathParams } from '@types';
import { isPageName } from '@utils';

export const pageGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return isPageName(next.params[PathParams.Page])
    ? true
    : router.createUrlTree([PAGES[0]]);
};

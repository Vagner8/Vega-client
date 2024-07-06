import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
// import { FractalService } from '@services';
import { Param, PageName } from '@types';

export const pageGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  // const us = inject(FractalService);
  if (['Users', 'Products', PageName.Home].includes(next.params[Param.Page])) {
    return true;
  } else {
    return router.createUrlTree([PageName.Home]);
  }
};

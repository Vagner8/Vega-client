import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
// import { UnitService } from '@services';
import { Param, PagesDefault } from '@types';

export const pageGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  // const us = inject(UnitService);
  if (['Users', 'Products', PagesDefault.Home].includes(next.params[Param.Page])) {
    return true;
  } else {
    return router.createUrlTree([PagesDefault.Home]);
  }
};

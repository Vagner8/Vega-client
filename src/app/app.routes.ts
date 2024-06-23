import { Routes } from '@angular/router';
import { ActiveComponent, PageComponent } from '@components';
import { Param } from '@types';
import { pageGuard } from '@guard';

export const routes: Routes = [
  {
    path: `:${Param.Page}`,
    canActivate: [pageGuard],
    component: PageComponent,
    children: [{ path: `:${Param.Active}`, component: ActiveComponent }],
  },
  { path: '**', redirectTo: 'Home' },
];

import { Routes } from '@angular/router';
import { Param } from '@types';
import { pageGuard } from '@guard';
import { PageComponent } from '@components/organisms';
import { ActiveComponent } from '@components/molecules';

export const routes: Routes = [
  {
    path: `:${Param.Page}`,
    canActivate: [pageGuard],
    component: PageComponent,
    children: [{ path: `:${Param.Active}`, component: ActiveComponent }],
  },
  { path: '**', redirectTo: 'Home' },
];

import { Routes } from '@angular/router';
import { ActiveComponent, PageComponent } from '@components';
import { Param } from '@types';

export const routes: Routes = [
  {
    path: `:${Param.Page}`,
    component: PageComponent,
    children: [{ path: `:${Param.Active}`, component: ActiveComponent }],
  },
  { path: '**', redirectTo: 'Home' },
];

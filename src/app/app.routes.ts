import { Routes } from '@angular/router';
import { Pages, Roots } from '@types';
import { PageComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${Roots.Pages}`,
    component: PageComponent,
  },
  {
    path: `:${Roots.Pages}/:${Roots.Modifiers}`,
    component: PageComponent,
  },
  { path: '**', redirectTo: Pages.Home },
];

import { Routes } from '@angular/router';
import { Pages, Roots } from '@types';
import { PageComponent, HomeComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: Pages.Home,
    component: HomeComponent,
  },
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

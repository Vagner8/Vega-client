import { Routes } from '@angular/router';
import { Pages, Roots } from '@types';
import { PageComponent, ModifierComponent, HomeComponent } from '@components/organisms';
import { pageGuard, modifierGuard } from '@guard';

export const routes: Routes = [
  {
    path: Pages.Home,
    component: HomeComponent,
  },
  {
    path: `:${Roots.Pages}`,
    canActivate: [pageGuard],
    component: PageComponent,
  },
  {
    path: `:${Roots.Pages}/:${Roots.Modifiers}`,
    canActivate: [modifierGuard],
    component: ModifierComponent,
  },
  { path: '**', redirectTo: Pages.Home },
];

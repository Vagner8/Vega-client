import { Routes } from '@angular/router';
import { Pages, Types } from '@types';
import { PageComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${Types.Pages}`,
    component: PageComponent,
  },
  { path: '**', redirectTo: Pages.Home },
];

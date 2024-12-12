import { Routes } from '@angular/router';
import { FractalsParams, Lists } from '@types';
import { PageComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${FractalsParams.Lists}`,
    component: PageComponent,
  },
  { path: '**', redirectTo: Lists.Home },
];

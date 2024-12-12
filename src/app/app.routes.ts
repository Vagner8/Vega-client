import { Routes } from '@angular/router';
import { Lists, Types } from '@types';
import { PageComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${Types.Lists}`,
    component: PageComponent,
  },
  { path: '**', redirectTo: Lists.Home },
];

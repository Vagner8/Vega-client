import { Routes } from '@angular/router';
import { FractalsParams, Collections } from '@types';
import { PageComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${FractalsParams.Collections}`,
    component: PageComponent,
  },
  { path: '**', redirectTo: Collections.Home },
];

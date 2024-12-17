import { Routes } from '@angular/router';
import { FractalsParams, Collections } from '@types';
import { ScreenComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${FractalsParams.Collections}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: Collections.Home },
];

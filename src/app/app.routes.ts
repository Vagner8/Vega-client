import { Routes } from '@angular/router';
import { ScreenComponent } from '@components/organisms';
import { FractalEntities } from '@types';

export const routes: Routes = [
  {
    path: `:${FractalEntities.Collections}`,
    component: ScreenComponent,
  },
  { path: '**', redirectTo: 'Home' },
];

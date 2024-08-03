import { Routes } from '@angular/router';
import { Param } from '@types';
import { HomeComponent, FractalComponent, ModifierComponent } from '@components/organisms';
import { fractalGuard, modifierGuard } from '@guard';

export const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: `:${Param.Page}`,
    canActivate: [fractalGuard],
    component: FractalComponent,
  },
  {
    path: `:${Param.Page}/:${Param.Modifier}`,
    canActivate: [modifierGuard],
    component: ModifierComponent,
  },
  { path: '**', redirectTo: 'Home' },
];

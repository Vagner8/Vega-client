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
    path: `:${Param.Fractal}`,
    canActivate: [fractalGuard],
    component: FractalComponent,
  },
  {
    path: `:${Param.Fractal}:${Param.Modifier}`,
    canActivate: [modifierGuard],
    component: ModifierComponent,
  },
  { path: '**', redirectTo: 'Home' },
];

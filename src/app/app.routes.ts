import { Routes } from '@angular/router';
import { PathParams } from '@types';
import { PageComponent, ModifierComponent, HomeComponent } from '@components/organisms';
// import { fractalGuard, modifierGuard } from '@guard';

export const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: `:${PathParams.Page}`,
    // canActivate: [fractalGuard],
    component: PageComponent,
  },
  {
    path: `:${PathParams.Page}/:${PathParams.Modifier}`,
    // canActivate: [modifierGuard],
    component: ModifierComponent,
  },
  { path: '**', redirectTo: 'Home' },
];

import { Routes } from '@angular/router';
import { FractalPagesNames, PathParams } from '@types';
import {
  PageComponent,
  ModifierComponent,
  HomeComponent,
} from '@components/organisms';
import { pageGuard, modifierGuard } from '@guard';

export const routes: Routes = [
  {
    path: FractalPagesNames.Home,
    component: HomeComponent,
  },
  {
    path: `:${PathParams.Page}`,
    canActivate: [pageGuard],
    component: PageComponent,
  },
  {
    path: `:${PathParams.Page}/:${PathParams.Modifier}`,
    canActivate: [modifierGuard],
    component: ModifierComponent,
  },
  { path: '**', redirectTo: FractalPagesNames.Home },
];

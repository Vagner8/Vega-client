import { Routes } from '@angular/router';
import { PathParams } from '@types';
import {
  PageComponent,
  ModifierComponent,
  HomeComponent,
} from '@components/organisms';
import { pageGuard, modifierGuard } from '@guard';
import { PAGES } from '@constants';

export const routes: Routes = [
  {
    path: PAGES[0],
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
  { path: '**', redirectTo: PAGES[0] },
];

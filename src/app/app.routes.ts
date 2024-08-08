import { Routes } from '@angular/router';
import { PathParam } from '@types';
import { PageComponent, ModifierComponent, HomeComponent } from '@components/organisms';
import { fractalGuard, modifierGuard } from '@guard';

export const routes: Routes = [
  {
    path: PathParam.Page,
    component: HomeComponent,
  },
  {
    path: `:${PathParam.Type}`,
    children: [
      {
        path: `:${PathParam.Page}`,
        canActivate: [fractalGuard],
        component: PageComponent,
      },
      {
        path: `:${PathParam.Page}/:${PathParam.Modifier}/:${PathParam.Ids}`,
        canActivate: [modifierGuard],
        component: ModifierComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'Pages' },
];

import { Routes } from '@angular/router';
import { PageName, Param } from '@types';
import { pageGuard } from '@guard';
import { PageComponent } from '@components/organisms';

export const routes: Routes = [
  {
    path: `:${Param.Page}`,
    canActivate: [pageGuard],
    component: PageComponent,
  },
  { path: '**', redirectTo: PageName.Home },
];

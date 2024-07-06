import { Routes } from '@angular/router';
import { PageName, Param } from '@types';
import { pageGuard } from '@guard';
import { HomeComponent, PageComponent } from '@components/organisms';
import { ActiveComponent } from '@components/molecules';

export const routes: Routes = [
  {
    path: PageName.Home,
    component: HomeComponent,
  },
  {
    path: `:${Param.Page}`,
    canActivate: [pageGuard],
    component: PageComponent,
    children: [{ path: `:${Param.Active}`, component: ActiveComponent }],
  },
  { path: '**', redirectTo: PageName.Home },
];

import { Routes } from '@angular/router';
import { PageComponent } from '@components';
import { RouteParam, PageTapName } from '@types';
import { ResolveService } from './services/resolve.service';

export const routes: Routes = [
  {
    path: `:${RouteParam.First}`,
    component: PageComponent,
    resolve: { responseDto: ResolveService.responseDto },
  },

  {
    path: '',
    redirectTo: PageTapName.Home,
    pathMatch: 'full',
  },
];

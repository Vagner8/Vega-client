import { Routes } from '@angular/router';
import { PageComponent } from '@components';
import { RouteParam, PageTapName } from '@types';

export const routes: Routes = [
  {
    path: `:${RouteParam.First}`,
    component: PageComponent,
  },
  { path: '', redirectTo: PageTapName.Matrices, pathMatch: 'full' },
  { path: '**', redirectTo: PageTapName.Matrices, pathMatch: 'full' },
];

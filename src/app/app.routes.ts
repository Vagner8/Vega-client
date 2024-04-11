import { Routes } from '@angular/router';
import { CreateComponent, PageComponent, TableComponent } from '@components';
import { PageTapName } from '@types';

export const routes: Routes = [
  {
    path: ':page',
    component: PageComponent,
    children: [
      { path: '', component: TableComponent },
      { path: ':action', component: CreateComponent },
    ],
  },
  { path: '', redirectTo: PageTapName.Matrices, pathMatch: 'full' },
  { path: '**', redirectTo: PageTapName.Matrices, pathMatch: 'full' },
];

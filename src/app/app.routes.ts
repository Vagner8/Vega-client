import { Routes } from '@angular/router';
import { ActionComponent, PageComponent } from '@components';
import { PageTypeName } from './types/tap.types';

export const routes: Routes = [
  { path: ':page', component: PageComponent },
  { path: ':page/:action?', component: ActionComponent },
  { path: '', redirectTo: PageTypeName.Matrices, pathMatch: 'full' },
  { path: '**', redirectTo: PageTypeName.Matrices, pathMatch: 'full' },
];

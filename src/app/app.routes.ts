import { Routes } from '@angular/router';
import { ActionComponent, PageComponent } from '@components';

export const routes: Routes = [
  { path: ':page', component: PageComponent },
  { path: ':page/:action?', component: ActionComponent },
];

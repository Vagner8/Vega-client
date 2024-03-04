import { Routes } from '@angular/router';
import {
  HomeComponent,
  CreateUserComponent,
  EditUserComponent,
  UsersComponent,
} from '@components';
import {
  ActiveBtnActName,
  NavigationBtnActName,
} from './types/btn-act.types';

const usersRoutes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: ActiveBtnActName.Create, component: CreateUserComponent },
  { path: ActiveBtnActName.Edit, component: EditUserComponent },
];

export const routes: Routes = [
  { path: NavigationBtnActName.Home, component: HomeComponent },
  { path: NavigationBtnActName.Users, children: usersRoutes },
  { path: '**', redirectTo: NavigationBtnActName.Home },
];

import { Routes } from '@angular/router';
import {
  HomeComponent,
  CreateUserComponent,
  EditUserComponent,
  UsersComponent
} from '@components';
import { ActionName } from './types/drawer.types';

const usersRoutes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: ActionName.Create, component: CreateUserComponent },
  { path: ActionName.Edit, component: EditUserComponent },
];

export const routes: Routes = [
  { path: ActionName.Home, component: HomeComponent },
  { path: ActionName.Users, children: usersRoutes },
  { path: '**', redirectTo: ActionName.Home },
];

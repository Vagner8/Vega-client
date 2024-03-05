import { Routes } from '@angular/router';
import {
  HomeComponent,
  CreateUserComponent,
  EditUserComponent,
  UsersComponent,
} from '@components';

const usersRoutes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'Create', component: CreateUserComponent },
  { path: 'Edit', component: EditUserComponent },
];

export const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Users', children: usersRoutes },
  { path: '**', redirectTo: 'Home' },
];

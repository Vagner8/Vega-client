import { Routes } from '@angular/router';
import {
  UsersComponent,
  HomeComponent,
  UserRegisterComponent,
} from '@components';
import { RoutePath } from './types/common.types';

export const routes: Routes = [
  {
    path: RoutePath.Actions,
    children: [{ path: RoutePath.Create, component: UserRegisterComponent }],
  },
  {
    path: RoutePath.Pages,
    children: [
      { path: RoutePath.Home, component: HomeComponent },
      { path: RoutePath.Users, component: UsersComponent },
    ],
  },
  {
    path: RoutePath.Settings,
    children: [],
  },
];

import { Routes } from '@angular/router';
import {
  HomeComponent,
  CreateUserComponent,
  EditUserComponent,
  UsersComponent,
  ModalComponent,
} from '@components';
import { TriggerName } from './types/drawer.types';

const usersRoutes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: TriggerName.Create, component: CreateUserComponent },
  { path: TriggerName.Edit, component: EditUserComponent },
];

export const routes: Routes = [
  { path: `${TriggerName.Modal}/:page/:action`, component: ModalComponent },
  { path: TriggerName.Home, component: HomeComponent },
  { path: TriggerName.Users, children: usersRoutes },
  { path: '**', redirectTo: TriggerName.Home },
];

import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: '', children: [
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UsersComponent },
  ] },
];

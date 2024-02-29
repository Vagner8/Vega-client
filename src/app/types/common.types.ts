import { FormControl } from '@angular/forms';

export interface ControlInput {
  formControl: FormControl;
  label: string;
  type: InputType;
}

export enum Locale {
  En = 'en',
  Ru = 'ru',
  Cz = 'cz',
}

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export enum InputLabel {
  Email = 'Email',
  Password = 'Password',
}

export type FormGroupMap<T> = {
  [K in keyof T]: FormControl;
};

export enum RoutePath {
  Actions = 'Actions',
  Pages = 'Pages',
  Settings = 'Settings',
  Create = 'Create',
  Home = 'Home',
  Users = 'Users',
}

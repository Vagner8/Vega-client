import { FormControl } from '@angular/forms';

export interface Controls {
  [key: string]: FormControl;
}

export enum Locale {
  En = 'en',
  Ru = 'ru',
  Cz = 'cz',
}

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password'
}
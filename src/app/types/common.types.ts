import { FormControl } from '@angular/forms';

export interface Controls {
  [key: string]: FormControl;
}

export enum Locale {
  En = 'en',
  Ru = 'ru',
  Cz = 'cz',
}

export type InputType = 'text' | 'email' | 'password';
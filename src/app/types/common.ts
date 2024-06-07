import { WritableSignal } from '@angular/core';
import { MatrixDto } from './matrix';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export type Visibility = 'hidden' | 'visible';

export interface ResponseDto {
  data: MatrixDto;
  success: boolean;
  error: string;
}

export type MapWritableSignal<T> = {
  [P in keyof T]: WritableSignal<T[P]>;
};

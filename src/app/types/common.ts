import { WritableSignal } from '@angular/core';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export type Visibility = 'hidden' | 'visible';

export type MapWritableSignal<T> = {
  [P in keyof T]: WritableSignal<T[P]>;
};

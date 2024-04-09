import { FormControl } from '@angular/forms';
import { WritableSignal } from '@angular/core';

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

export type Visibility = 'hidden' | 'visible';

export type Rec = {
  name: WritableSignal<string | null>;
};

export type RecKey = 'btn';

export type RecGroup = Record<RecKey, Rec[]>;

export enum RouteParam {
  First = 'First',
  Second = 'Second',
}

export interface Address {
  [RouteParam.First]: string,
  [RouteParam.Second]: string
}
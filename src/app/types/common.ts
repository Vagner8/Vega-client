import { WritableSignal } from '@angular/core';

export type SidenavState = 'open' | 'close';
export type Visibility = 'hidden' | 'visible';
export type MapWritableSignal<T> = {
  [P in keyof T]: WritableSignal<T[P]>;
};

export type SuccessMessages = 'Good to go!';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export enum Param {
  Page = 'Page',
  Active = 'Active',
}

export enum PagesDefault {
  Home = 'Home',
}

export enum Pages {
  Users = 'Users',
  Products = 'Products',
}

export enum Indicator {
  Unit = 'Unit',
  Child = 'Name',
  Icon = 'Icon',
  Sort = 'Sort',
}

export interface Exception {
  type: string;
  title: string;
  status: 500;
  detail: string;
  instance: string;
}

export interface SnackBarConfig {
  duration: number;
  panelClass: string;
  announcementMessage: string;
}

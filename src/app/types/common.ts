export type ClickType = 'Click' | 'HoldClick' | 'DoubleClick';
export type SidenavState = 'open' | 'close';
export type Visibility = 'hidden' | 'visible';

export type SuccessMessages = 'Good to go!';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export enum Param {
  Page = 'Page',
}

export enum PageName {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
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

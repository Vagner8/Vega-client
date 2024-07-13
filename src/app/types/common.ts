export type SidenavState = 'Open' | 'Close';
export type Visibility = 'Hidden' | 'Visible';

export type SuccessMessages = 'Good to go!';

export enum InputType {
  Text = 'Text',
  Email = 'Email',
  Password = 'Password',
}

export enum Param {
  Page = 'Page',
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

export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export type Visibility = 'hidden' | 'visible';

export interface Address {
  page: string;
  action: string;
}

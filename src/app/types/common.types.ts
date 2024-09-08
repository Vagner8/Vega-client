export type RenderTypes = 'Taps' | 'Table';

export enum InputType {
  Text = 'Text',
  Email = 'Email',
  Password = 'Password',
}

export interface Exception {
  type: string;
  title: string;
  status: 500;
  detail: string;
  instance: string;
}

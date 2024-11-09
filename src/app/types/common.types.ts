export enum InputType {
  Text = 'Text',
  Email = 'Email',
  Password = 'Password',
}

export enum Click {
  One = 'one',
  Hold = 'hold',
  Double = 'double',
}

export type Timeout = ReturnType<typeof setTimeout>;

export interface Exception {
  type: string;
  title: string;
  status: 500;
  detail: string;
  instance: string;
}

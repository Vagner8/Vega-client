import { FractalDto } from './fractal.types';

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

export interface TableData {
  sort: string;
  dataSource: FractalDto[];
}

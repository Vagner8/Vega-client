import { FractalDto } from './fractal';
import { TapModifiersNames, TapPagesNames, TapTypes } from './tap';

export type SidenavState = 'Open' | 'Close';
export type Visibility = 'Hidden' | 'Visible';
export type ClickType = 'Click' | 'Double' | 'Hold';
export type SuccessMessages = 'Good to go!';

export enum InputType {
  Text = 'Text',
  Email = 'Email',
  Password = 'Password',
}

export enum PathParam {
  Ids = 'Ids',
  Type = 'Type',
  Page = 'Page',
  Modifier = 'Modifier',
}

export interface Exception {
  type: string;
  title: string;
  status: 500;
  detail: string;
  instance: string;
}

export type SegmentsTuple = [
  Segments['type'],
  Segments['page'],
  Segments['modifier'],
  Segments['ids'],
];

export interface Segments {
  ids: string | null;
  type: TapTypes | null;
  page: TapPagesNames | null;
  modifier: TapModifiersNames | null;
}

export interface TableData {
  sort: string[];
  dataSource: FractalDto[];
}

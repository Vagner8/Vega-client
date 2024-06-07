import { FormControl } from '@angular/forms';
import { MapWritableSignal } from './common';

export enum MatrixIndicator {
  Sort = 'Sort',
  Matrix = 'Matrix',
}

export enum GroupIndicator {
  Act = 'Act',
  Sort = 'Sort',
  Icon = 'Icon',
  Group = 'Group',
}

export enum UnitIndicator {
  Act = 'Act',
  Name = 'Name',
  Email = 'Email',
}

export enum ActData {
  None = 'None',
  Add = 'Add',
  Update = 'Update',
  Remove = 'Remove'
}

export type ControlSignals = MapWritableSignal<ControlStateValue>;

export interface Controls {
  [key: string]: IControl;
}

export interface ControlDto {
  id: string;
  indicator: string;
  data: string;
}

export interface ControlStateValue {
  disabled: boolean;
}

export interface ControlProps {
  dto: ControlDto;
  state?: Partial<ControlStateValue>;
}

export interface IControl {
  data: FormControl<string | null>;
  indicator: FormControl<string | null>;
  get dto(): ControlDto;
  setState(value: Partial<ControlStateValue>): void;
}

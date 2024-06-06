import { FormControl } from '@angular/forms';
import { MapWritableSignal } from './common';

export type CommonIndicators = 'Icon' | 'Sort';
export type MatrixIndicators = 'Matrix' | CommonIndicators;
export type GroupIndicators = 'Group' | 'Act' | CommonIndicators;
export type UnitIndicators = 'Name' | 'Email' | 'Act';
export type ActData = 'None' | 'Add' | 'Update' | 'Remove';
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

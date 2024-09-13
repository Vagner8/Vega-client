import { WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

export enum Indicators {
  Icon = 'Icon',
  Sort = 'Sort',
  Fractal = 'Fractal',
}

export type ControlDta = Record<Indicators, string>;

export interface ControlSignals {
  disabled: WritableSignal<boolean>;
}

export interface ControlBase {
  id?: string;
  parentId: string | null;
}

export interface Control extends ControlBase {
  state: ControlSignals;
  data: FormControl<null | string>;
  indicator: FormControl<null | string>;
}

export interface Controls {
  [key: string]: Control;
}

export interface ControlDto extends ControlBase {
  data: string;
  indicator: string;
}

export interface ControlsDto {
  [key: string]: ControlDto;
}

export interface IControls {
  name: string;
  sort: string[];
  icon: string;
  data(indicator: string): string;
}

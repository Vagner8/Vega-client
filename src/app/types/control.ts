import { WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

export type Indicators = `${Indicator}`;

export enum Indicator {
  Fractal = 'Fractal',
  Icon = 'Icon',
  Sort = 'Sort',
}

export interface ControlSignals {
  disabled: WritableSignal<boolean>;
}

export interface ControlBase<T> {
  id?: string;
  parentId: string | null;
  data: T;
  indicator: T;
}

export interface Control extends ControlBase<FormControl<null | string>> {
  state: ControlSignals;
}

export interface Controls {
  [key: string]: Control;
}

export interface ControlDto extends ControlBase<string> {}

export interface ControlsDto {
  [key: string]: ControlDto;
}

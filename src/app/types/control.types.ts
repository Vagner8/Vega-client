import { Signal } from '@angular/core';
import { FormControl } from '@angular/forms';

export type ControlIndicator = 'Matrix' | 'Group' | 'Act' | 'Icon' | 'Sort';
export type ControlAct = 'None' | 'Add' | 'Update' | 'Remove';

export interface ControlDto {
  id: string;
  indicator: string;
  data: string;
}

export interface Control {
  id?: string;
  indicator: FormControl;
  data: FormControl;
  signal: Signal<ControlState>;
}

export interface ControlState {
  disabled: boolean;
}

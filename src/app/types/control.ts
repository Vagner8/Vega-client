import { WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ControlSignals {
  disabled: WritableSignal<boolean>;
}

export interface Control {
  id?: string;
  unitId: string;
  indicator: FormControl<null | string>;
  data: FormControl<null | string>;
  state: ControlSignals;
}

export interface Controls {
  [key: string]: Control;
}

export interface ControlDto {
  id: string;
  unitId: string;
  indicator: string;
  data: string;
}

export interface ControlsDto {
  [key: string]: ControlDto;
}

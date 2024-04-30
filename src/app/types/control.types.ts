import { FormControl } from '@angular/forms';

export type ControlName = 'Act' | 'Name' | 'Icon' | 'Sort';
export type ControlAct = 'None' | 'Add' | 'Update' | 'Remove';
export type ControlType = 'Text' | 'Select' | 'Number' | 'Email';

export interface ControlDtoBase {
  name: ControlName | string;
  data: string;
  type: ControlType;
  act: ControlAct;
}

export interface ControlDto extends ControlDtoBase {
  id: string;
}

export type ControlBase = Record<
  keyof ControlDtoBase,
  FormControl<string | null>
>;

export interface Control extends ControlBase {
  id?: string;
}

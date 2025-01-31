import { FormControl } from '@angular/forms';

export const ControlInputs = {
  New: 'New',
  Text: 'Text',
  Select: 'Select',
  Organizer: 'Organizer',
} as const;

export const ControlFieldsNames: (keyof ControlFields)[] = ['data', 'input'];

export type ControlsDto = Record<string, ControlDto>;

export interface ControlFields<T = FormControl> {
  data: T;
  input: T;
}

export interface ControlDto extends ControlFields<string> {
  id: string;
  parentId: string;
  indicator: string;
}

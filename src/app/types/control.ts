import { FormControl } from '@angular/forms';

export const ControlInputs = {
  New: 'New',
  Text: 'Text',
  Select: 'Select',
  Organizer: 'Organizer',
} as const;

export const ControlFields: Record<keyof ControlDto, keyof ControlDto> = {
  id: 'id',
  data: 'data',
  input: 'input',
  parentId: 'parentId',
  indicator: 'indicator',
} as const;

export const ControlFormsFieldsNames: (keyof ControlFormsFields)[] = ['data', 'input'];

export type ControlsDto = Record<string, ControlDto>;

export interface ControlFormsFields<T = FormControl> {
  data: T;
  input: T;
}

export interface ControlDto extends ControlFormsFields<string> {
  id: string;
  parentId: string;
  indicator: string;
}

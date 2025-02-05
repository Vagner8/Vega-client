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

export const ControlFormsFields: Record<keyof ControlDtoFormsFields, keyof ControlDtoFormsFields> = {
  data: 'data',
  input: 'input',
} as const;

export const CollectionControlMenu = {
  Edit: 'Edit',
  Draft: 'Draft',
  New: 'New',
};

export const ControlMenu = {
  ...CollectionControlMenu,
  Cancel: 'Cancel',
};

export type ControlsDto = Record<string, ControlDto>;

export interface ControlDtoFormsFields<T = FormControl> {
  data: T;
  input: T;
}

export interface ControlDto extends ControlDtoFormsFields<string> {
  id: string;
  parentId: string;
  indicator: string;
}

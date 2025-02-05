import { FormControl } from '@angular/forms';

export const ControlInputs = {
  New: 'New',
  Text: 'Text',
  Select: 'Select',
  Organizer: 'Organizer',
} as const;

export const ControlFormcontrolsIndicators: Record<keyof ControlFormControls, keyof ControlFormControls> = {
  data: 'data',
  input: 'input',
};

export const ControlKeys: Record<keyof ControlDto, keyof ControlDto> = {
  id: 'id',
  parentId: 'parentId',
  indicator: 'indicator',
  ...ControlFormcontrolsIndicators,
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
export type ControlFormControls = ControlDtoChangeable<FormControl>;

type ControlDtoChangeable<T> = {
  data: T;
  input: T;
};

export type ControlDto = {
  id: string;
  parentId: string;
  indicator: string;
} & ControlDtoChangeable<string>;

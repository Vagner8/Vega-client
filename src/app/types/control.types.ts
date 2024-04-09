import { FormControl } from '@angular/forms';
import { ControlDto } from './dto.types';

export enum Operation {
  None,
  Create,
  Update,
  Delete,
}

export enum ControlFieldType {
  Text = 'Text',
  Select = 'Select',
  Number = 'Number'
}

export interface ControlOptions {
  selectOptions: string[];
}

export type ControlNames = keyof Omit<ControlDto, 'id'>;

export interface ControlItem {
  name: ControlNames;
  valueType: ControlFieldType;
  formControl: FormControl;
  options?: ControlOptions;
}
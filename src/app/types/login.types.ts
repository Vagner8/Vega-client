import { FormControl } from '@angular/forms';
import { InputType } from './common.types';

export interface LoginInput {
  formControl: FormControl;
  label: string;
  type: InputType;
}
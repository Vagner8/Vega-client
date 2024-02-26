import { FormControl } from '@angular/forms';
import { InputType } from './elements.types';

export interface LoginInput {
  formControl: FormControl;
  label: string;
  type: InputType;
}
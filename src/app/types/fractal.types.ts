import { FormControl, FormGroup } from '@angular/forms';
import { ControlDto } from '@types';

export enum Roots {
  Pages = 'Pages',
  Manager = 'Manager',
  Modifiers = 'Modifiers',
}

export enum Pages {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
}

export enum Modifiers {
  Add = 'Add',
  Edit = 'Edit',
  Save = 'Save',
  Delete = 'Delete',
}

export enum Queries {
  Rows = 'Rows',
  Manager = 'Manager',
}

export interface FractalDto {
  id: string;
  fractals: FractalDto[] | null;
  controls: ControlDto[];
}

export type FractalNull = Fractal | null;
export type YesNo = (fractal: Fractal) => void;
export type FractalFormControl = FormControl<string | null>;
export type FractalFormControls = Record<string, FractalFormControl>;

export interface FractalResult {
  yes: (callback: YesNo) => FractalResult;
  no: (callback: YesNo) => FractalResult;
  result: boolean;
}

export interface FractalCheckProps {
  name?: string;
  type?: object;
  action?: Partial<FractalActionFields>;
}

interface FractalMethods {
  get fractalsList(): Fractal[];
  get controlsList(): ControlDto[];
  find(name: string, fractals?: Fractal[] | null): FractalNull;
  data(indicator: string): string;
  check(test: string | object): FractalResult;
  getFormControl(indicator: string): FractalFormControl;
}

type FractalFields = {
  name: string;
  icon: string;
  sort: string[];
  fractals: Fractal[] | null;
  formGroup: FormGroup<FractalFormControls>;
} & FractalActionFields;

export interface FractalActionFields {
  clicked: string | null;
}

export type Fractal = FractalFields & FractalMethods & FractalDto;

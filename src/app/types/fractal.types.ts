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
  New = 'New',
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
  parentId: string;
  fractals: FractalDto[];
  controls: ControlDto[];
}

export type FractalNull = Fractal | null;
export type FractalFormControl = FormControl<string | null>;
export type FractalFormControls = Record<string, FractalFormControl>;

export interface FractalCheckProps {
  name?: string;
  type?: object;
  action?: Partial<FractalActions>;
}

interface FractalMethods {
  find(name: string, fractals?: Fractal[] | null): FractalNull;
  data(indicator: string): string;
  checkCursor(test: string): boolean;
  checkType(type: object): boolean;
  checkActions(actions: Partial<FractalActions>): boolean;
  formControl(indicator: string): FractalFormControl;
}

type FractalFields = {
  dto: FractalDto;
  icon: string;
  sort: string[];
  cursor: string;
  actions: FractalActions;
  isClone: boolean;
  fractals: Fractal[];
  formGroup: FormGroup<FractalFormControls>;
  confirmation: boolean;
};

export interface FractalActions {
  clicked: string | null;
}

export type Fractal = FractalFields & FractalMethods;

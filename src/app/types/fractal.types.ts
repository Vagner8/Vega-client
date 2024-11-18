import { FormControl, FormGroup } from '@angular/forms';

export enum Types {
  Root = 'Root',
  Rows = 'Rows',
  Taps = 'Taps',
  Pages = 'Pages',
  Manager = 'Manager',
  Modifier = 'Modifier',
  Modifiers = 'Modifiers',
}

export enum Events {
  Hold = 'Hold',
  Click = 'Click',
}

export enum Indicators {
  Icon = 'Icon',
  Sort = 'Sort',
  Cursor = 'Cursor',
  Options = 'Options',
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

export type ControlsDto = Record<string, ControlDto>;
export type FractalsDto = Record<string, FractalDto>;
export type IFractals = Record<string, IFractal>;

export interface ControlDto {
  id: string;
  data: string;
  parentId: string;
  indicator: string;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface FractalFormGroup {
  data: FormGroup;
  get(indicator: string): FormControl;
}

export interface IFractal {
  dto: FractalDto;
  cursor: string;
  fractals: IFractals | null;
  formGroup: FractalFormGroup;
  isClone?: boolean;

  is(test: string | object): boolean;
  data(indicator: string): string;
  list(): IFractal[];
  find(test: string, fractals?: IFractals | null): IFractal | null;
  split<T extends []>(indicator: string): T;
  update(): FractalDto;
}

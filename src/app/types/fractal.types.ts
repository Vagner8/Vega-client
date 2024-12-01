import { FormControl, FormGroup } from '@angular/forms';

export enum Types {
  Root = 'Root',
  Rows = 'Rows',
  Taps = 'Taps',
  Pages = 'Pages',
  Manager = 'Manager',
  Settings = 'Settings',
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
  Toggle = 'Toggle',
  Select = 'Select',
  Cursor = 'Cursor',
  Position = 'Position',
}

export enum Toggles {
  DragAndDrop = 'Drag-and-Drop',
}

export enum Selects {
  Menu = 'Menu',
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
export type ControlDtoData = string | boolean;

export interface ControlDto {
  id: string;
  data: ControlDtoData;
  parentId: string;
  indicator: string;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface IFractal {
  dto: FractalDto;
  cursor: string;
  fractals: IFractals | null;
  formGroup: FormGroup;
  isClone?: boolean;

  is(test: string | object): boolean;
  has(indicator: string): boolean;
  data(indicator: string): ControlDtoData;
  list(): IFractal[];
  find(test: string, fractals?: IFractals | null): IFractal | null;
  bool(indicator: string): boolean;
  array(indicator: string): string[];
  string(indicator: string): string;
  update(): FractalDto;
  getFormControl(name: string): FormControl | null;
}

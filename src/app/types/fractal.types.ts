import { FormControl, FormGroup } from '@angular/forms';

export enum Fractals {}

export enum Types {
  Root = 'Root',
  Rows = 'Rows',
  Taps = 'Taps',
  Lists = 'Lists',
  Manager = 'Manager',
  Settings = 'Settings',
  Modifier = 'Modifier',
  Modifiers = 'Modifiers',
}

export enum Events {
  Hold = 'Hold',
  Touch = 'Touch',
}

export enum Indicators {
  X = 'X',
  Y = 'Y',
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

export enum Lists {
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

export enum FractalStatus {
  New = 'New',
  Stable = 'Stable',
}

export type ControlsDto = Record<string, ControlDto>;
export type FractalsDto = Record<string, FractalDto>;
export type IFractals = Record<string, IFractal>;
export type ControlDtoData = string | boolean;

export interface FractalEvent {
  type: keyof typeof Events;
  fractal: IFractal;
}

export interface ControlDto {
  id: string;
  data: ControlDtoData;
  parentId: string;
  indicator: string;
  client?: boolean;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface $Event {
  type: keyof typeof Events;
  fractal: IFractal;
}

export interface IFractal {
  dto: FractalDto;
  status: FractalStatus;
  cursor: string;
  parent: IFractal;
  fractals: IFractals | null;
  formGroup: FormGroup;

  is(test: string | object): boolean;
  has(indicator: string): boolean;
  data(indicator: string): ControlDtoData;
  find(test: Events[number], fractals?: IFractals | null): IFractal;
  bool(indicator: string): boolean;
  list(): IFractal[];
  sort(): string[];
  split(indicator: string): string[];
  clone(): IFractal;
  string(indicator: string): string;
  update(): FractalDto;
  navigate?: <T>(state: T) => Promise<void>;
  getFormControl(name: string): FormControl | null;
}

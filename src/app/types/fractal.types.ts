import { FormArray, FormControl, FormGroup } from '@angular/forms';

export enum Events {
  Hold = 'Hold',
  Touch = 'Touch',
}

export enum Indicators {
  X = 'X',
  Y = 'Y',
  Icon = 'Icon',
  Toggle = 'Toggle',
  Select = 'Select',
  Cursor = 'Cursor',
  Columns = 'Columns',
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
  Columns = 'Columns',
}

export enum FractalStatus {
  New = 'New',
  Stable = 'Stable',
}

export type ControlsDto = Record<string, ControlDto>;
export type FractalsDto = Record<string, FractalDto>;
export type IFractals = Record<string, IFractal>;

export interface FractalEvent {
  type: keyof typeof Events;
  fractal: IFractal;
}

export interface ControlDto {
  id: string;
  data: string;
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
  formArray: FormArray<FormGroup>;

  is(test: string | object): boolean;
  has(indicator: string): boolean;
  data(indicator: string): string;
  find(test: Events[number], fractals?: IFractals | null): IFractal;
  list(): IFractal[];
  clone(): IFractal;
  update(): FractalDto;
  columns(): string[];
  indicators(): string[];
  navigate?: <T>(state: T) => Promise<void>;
  getFormControl(name: string): FormControl | null;
}

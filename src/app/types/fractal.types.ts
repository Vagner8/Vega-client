import { WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export enum Types {
  Root = 'Root',
  Rows = 'Rows',
  Pages = 'Pages',
  Manager = 'Manager',
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

  data(indicator: string): string;
  list(): IFractal[];
  find(test: string, fractals?: IFractals | null): IFractal | null;
  split<T extends []>(indicator: string): T;
  isType(type: object): boolean;
  isCursor(data: string): boolean;
}

export interface IState {
  fractal: IFractal | null;
  $fractal: WritableSignal<IFractal | null>;
  fractal$: Subject<IFractal | null>;
  set(fractal: IFractal | null, event?: string): void;
}

export interface IStates {
  $fractals: WritableSignal<IFractal[]>;
  set(fractal: IFractal | null, event?: string): void;
}

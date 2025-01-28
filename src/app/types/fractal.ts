import { FormRecord } from '@angular/forms';
import { ControlDto, ControlsDto } from './control';

export enum Events {
  Hold = 'Hold',
  Touch = 'Touch',
}

export enum FractalTypes {
  Category = 'Category',
  Collection = 'Collection',
  item = 'item',
}

export enum Collections {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
}

export enum FractalEntities {
  Root = 'Root',
  Rows = 'Rows',
  Taps = 'Taps',
  Manager = 'Manager',
  Modifiers = 'Modifiers',
  Collections = 'Collections',
}

export enum Modifiers {
  App = 'App',
  New = 'New',
  Edit = 'Edit',
  Save = 'Save',
  Delete = 'Delete',
  Columns = 'Columns',
}

export type FractalsDto = Record<string, FractalDto>;
export type Fractals = Record<string, Fractal>;

export interface FractalEvent {
  type: keyof typeof Events;
  fractal: Fractal;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface Fractal {
  dto: FractalDto;
  form: FormRecord;
  parent: Fractal;
  fractals: Fractals | null;

  get cursor(): string;
  get columns(): string[];
  get fractalsArray(): Fractal[];
  get controlsArray(): ControlDto[];

  is(test: string | object): boolean;
  data(indicator: string): string;
  find(test: string): Fractal | null;
  split(indicator: string): string[];
  update(): FractalDto;
  retrieve(test: string): Fractal;
}

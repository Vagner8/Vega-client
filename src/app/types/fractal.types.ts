import { Click, ControlDto } from '@types';

export enum Roots {
  Items = 'Items',
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
  Taps = 'Taps',
  Page = 'Page',
  Items = 'Items',
  Manager = 'Manager',
  Modifier = 'Modifier',
}

export interface FractalDto {
  id: string;
  fractals: FractalDto[] | null;
  controls: ControlDto[];
}

export type FractalNull = Fractal | null;

export interface YesNo {
  yes?(): void;
  no?(): void;
}

interface FractalMethods {
  get arr(): Fractal[];
  is(type: object, yesNo?: YesNo): boolean;
  was(fields: Partial<FractalToCheckFields>, yesNo?: YesNo): boolean;
  find(name: string, fractals?: Fractal[] | null): FractalNull;
  data(indicator: string): string;
}

type FractalFields = {
  icon: string;
  sort: string[];
  fractals: Fractal[] | null;
} & FractalToCheckFields;

export interface FractalActionFields {
  clicked: Click | null;
}

export type FractalToCheckFields = {
  name: string;
} & FractalActionFields;

export type Fractal = FractalFields & FractalMethods & FractalDto;

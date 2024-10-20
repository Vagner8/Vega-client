import { ControlDto } from '@types';

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
export type YesNo = (fractal: Fractal) => void;

export interface FractalResult {
  yes: (callback: YesNo) => FractalResult;
  no: (callback: YesNo) => FractalResult;
  result: boolean;
}

interface FractalMethods {
  get arr(): Fractal[];
  is(type: object | string): FractalResult;
  was(fields: Partial<FractalToCheckFields>): FractalResult;
  find(name: string, fractals?: Fractal[] | null): FractalNull;
  data(indicator: string): string;
}

type FractalFields = {
  icon: string;
  sort: string[];
  fractals: Fractal[] | null;
} & FractalToCheckFields;

export interface FractalActionFields {
  clicked: string | null;
}

export type FractalToCheckFields = {
  name: string;
} & FractalActionFields;

export type Fractal = FractalFields & FractalMethods & FractalDto;

import { FormRecord } from '@angular/forms';

export enum Events {
  Hold = 'Hold',
  Touch = 'Touch',
}

export enum Collections {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
}

export type FractalsDto = Record<string, FractalDto>;
export type IFractals = Record<string, IFractal>;
export type ControlsDto = Record<string, ControlDto>;

export interface ControlDto {
  id: string;
  data: string;
  parentId: string;
  indicator: string;
}

export interface FractalEvent {
  type: keyof typeof Events;
  fractal: IFractal;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface IFractal {
  dto: FractalDto;
  form: FormRecord;
  parent: IFractal;
  fractals: IFractals | null;

  get cursor(): string;
  get columns(): string[];
  get fractalsArray(): IFractal[];
  get controlsArray(): ControlDto[];

  is(test: string | object): boolean;
  data(indicator: string): string;
  find(test: string): IFractal | null;
  split(indicator: string): string[];
  update(): FractalDto;
  retrieve(test: string): IFractal;
  createChild(): IFractal;
}

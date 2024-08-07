import { Controls, ControlsDto } from '@types';

export type FractalsNames = 'Products' | 'Users';

export interface Fractal {
  id?: string;
  parentId: string;
  fractals: Fractals;
  controls: Controls;
}

export interface Fractals {
  [key: string]: Fractal;
}

export interface FractalDto {
  id?: string;
  parentId: string;
  fractals: FractalsDto;
  controls: ControlsDto;
}

export interface FractalsDto {
  [key: string]: FractalDto;
}

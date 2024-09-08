import { FRACTALS, MODIFIERS, PAGES } from '@constants';
import { Controls, ControlsDto } from '@types';

export type FractalTapNames = (typeof FRACTALS)[number];
export type FractalPagesNames = (typeof PAGES)[number];
export type FractalModifiersNames = (typeof MODIFIERS)[number];

export type FractalNames = FractalTapNames | FractalPagesNames | FractalModifiersNames;

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

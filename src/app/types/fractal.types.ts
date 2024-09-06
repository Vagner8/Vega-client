import { Signal } from '@angular/core';
import { FRACTALS, MODIFIERS, PAGES } from '@constants';
import { Controls, ControlsDto } from '@types';

export type FractalNames = (typeof FRACTALS)[number];
export type FractalSignal = Signal<FractalDto | null>;
export type FractalSignals = Record<FractalNames, FractalSignal>;
export type FractalPagesNames = (typeof PAGES)[number];
export type FractalModifiersNames = (typeof MODIFIERS)[keyof typeof MODIFIERS];

export type FractalData = Record<FractalNames, FractalDto>;

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

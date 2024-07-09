import { ClickMaster, Controls, ControlsDto } from '@types';

export interface FractalFields extends ClickMaster {
  data(indicator: string): string | null;
  childArr(name: string): Fractal[];
  childSort(name: string): string[] | undefined;
}

export interface Fractal extends FractalFields {
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

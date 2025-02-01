import { FormControl, FormRecord } from '@angular/forms';
import { ControlDto, ControlDtoFormsFields, ControlsDto } from './control';

export type Fractals = Record<string, Fractal>;
export type FractalsDto = Record<string, FractalDto>;
export type FractalForm = FormRecord<FormRecord<FormControl>>;

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null;

  get sort(): string[];
  get cursor(): string;
  get fractalsArray(): Fractal[];
  get controlsArray(): ControlDto[];

  is(test: string | object): boolean;
  has(test: string): boolean;
  getData(indicator: string): string;
  splitData(indicator: string): string[];
  getFractal(test: string): Fractal;
  getControl(indicator: string): ControlDto;
  findControl(indicator: string): ControlDto | null;
  findFractal(test: string): Fractal | null;
  getControlFields(name: string): ControlDtoFormsFields;
  updateFractalByForm(): FractalDto;
}

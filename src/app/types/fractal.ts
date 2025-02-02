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
  get children(): Fractal[];
  get controls(): ControlDto[];
  get childrenKeys(): string[];
  get controlsKeys(): string[];

  is(test: string | object): boolean;
  has(test: string): boolean;
  getFractal(test: string): Fractal;
  getControl(indicator: string): ControlDto;
  findControl(indicator: string): ControlDto | null;
  findFractal(test: string): Fractal | null;
  getControlData(indicator: string): string;
  splitControlData(indicator: string): string[];
  updateFractalByForm(): FractalDto;
  getControlFormsFields(name: string): ControlDtoFormsFields;
}

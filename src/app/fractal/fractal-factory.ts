import {
  FractalDto,
  Fractal,
  Fractals,
  ControlDto,
  FractalsDto,
  Indicators,
  SplitIndicators,
  FractalForm,
  ControlDtoFormsFields,
  ControlFormsFields,
} from '@types';
import { FractalDtoFactory } from './fractal-dto-factory';
import { checkValue, createForm } from '@utils';
import { findFractalRecursively } from 'app/utils/getters';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FractalForm;
  parent: Fractal;
  fractals: Fractals | null = null;

  constructor({ dto, parent }: { dto?: FractalDto; parent?: Fractal | null }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto ? dto : new FractalDtoFactory(this.parent);
    this.form = createForm(this.dto.controls);
    this.fractals = this.createFractals(this.dto.fractals, this);
  }

  get sort(): string[] {
    const sort = Object.keys(this.parent).length > 0 ? this.parent.splitData(SplitIndicators.Sort) : [];
    return sort.length === 0 && this.dto.fractals ? Object.keys(this.dto.fractals) : sort;
  }

  get cursor(): string {
    return this.getData(Indicators.Cursor) || this.getData(Indicators.Position);
  }

  get fractalsArray(): Fractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  get controlsArray(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  is(test: string | object): boolean {
    if (test instanceof FractalFactory) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  has(test: string): boolean {
    return Boolean(this.getData(test));
  }

  getData(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  splitData(indicator: string): string[] {
    const data = this.getData(indicator);
    return data ? data.split(':') : [];
  }

  updateFractalByForm(): FractalDto {
    const [data, input] = Object.values(ControlFormsFields);
    for (const indicator in this.dto.controls) {
      const formRecord = this.form.get(indicator);
      if (formRecord) {
        const control = this.dto.controls[indicator];
        control.data = formRecord.value[data];
        control.input = formRecord.value[input];
      }
    }
    return this.dto;
  }

  getFractal(test: string): Fractal {
    const fractal = findFractalRecursively(test, this.fractals);
    return checkValue<Fractal>(fractal, test);
  }

  findFractal(test: string): Fractal | null {
    return findFractalRecursively(test, this.fractals);
  }

  getControl(indicator: string): ControlDto {
    const control = this.dto.controls[indicator];
    if (control) return control;
    else throw new Error(`Unable to get control by: ${indicator}`);
  }

  findControl(indicator: string): ControlDto | null {
    const control = this.dto.controls[indicator];
    return control ? control : null;
  }

  getControlFields(name: string): ControlDtoFormsFields {
    const formRecord = this.form.controls[name];
    return Object.values(ControlFormsFields).reduce((acc, field) => {
      acc[field] = formRecord.controls[field];
      return acc;
    }, {} as ControlDtoFormsFields);
  }

  private createFractals(fractalsDto: FractalsDto | null, parent: Fractal): Fractals | null {
    if (!fractalsDto) return null;
    const result: Fractals = {};
    for (const indicator in fractalsDto) {
      const fractal = new FractalFactory({ parent, dto: fractalsDto[indicator] });
      fractal.fractals = this.createFractals(fractalsDto[indicator].fractals, fractal);
      result[indicator] = fractal;
    }
    return result;
  }
}

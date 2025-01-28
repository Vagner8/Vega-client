import { FormRecord } from '@angular/forms';
import {
  FractalDto,
  Fractal,
  Fractals,
  ControlDto,
  FractalsDto,
  FractalEntities,
  Indicators,
  SplitebleIndicators,
} from '@types';
import { createForm, findFractalRecursively } from './helpers';

export class FractalFactory implements Fractal {
  form: FormRecord;
  fractals: Fractals | null = null;

  constructor(
    public dto: FractalDto,
    public parent: Fractal = {} as Fractal
  ) {
    this.form = createForm(dto.controls);
    this.fractals = this.createFractals(dto.fractals, this);
  }

  get cursor(): string {
    return this.data(Indicators.Cursor) || this.data(Indicators.Position);
  }

  get columns(): string[] {
    if (this.is(FractalEntities.Root) || !this.parent.data(SplitebleIndicators.Columns)) {
      return Object.keys(this.dto.controls);
    }
    return this.parent.split(SplitebleIndicators.Columns);
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

  data(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  find(test: string): Fractal | null {
    return findFractalRecursively(test, this.fractals);
  }

  split(indicator: string): string[] {
    const data = this.data(indicator);
    return data ? data.split(':') : [];
  }

  update(): FractalDto {
    for (const indicator in this.form.value) {
      this.dto.controls[indicator].data = this.form.value[indicator];
    }
    return this.dto;
  }

  retrieve(test: string): Fractal {
    const fractal = findFractalRecursively(test, this.fractals);
    if (fractal) return fractal;
    else throw new Error(`Unable to find fractal by: ${test}`);
  }

  private createFractals(fractalsDto: FractalsDto | null, parent: Fractal): Fractals | null {
    if (!fractalsDto) return null;
    const result: Fractals = {};
    for (const indicator in fractalsDto) {
      const fractal = new FractalFactory(fractalsDto[indicator], parent);
      fractal.fractals = this.createFractals(fractalsDto[indicator].fractals, fractal);
      result[indicator] = fractal;
    }
    return result;
  }
}

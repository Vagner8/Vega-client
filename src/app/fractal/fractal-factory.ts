import { FormRecord } from '@angular/forms';
import {
  FractalDto,
  Fractal,
  Fractals,
  ControlDto,
  FractalsDto,
  FractalEntities,
  Indicators,
  SplitIndicators,
} from '@types';
import { createForm, findFractalRecursively } from './helpers';
import { FractalDtoFactory } from './fractal-dto-factory';

export class FractalFactory implements Fractal {
  dto: FractalDto;
  form: FormRecord;
  parent: Fractal;
  fractals: Fractals | null = null;

  constructor({ dto, parent }: { dto?: FractalDto; parent?: Fractal }) {
    this.parent = parent ? parent : ({} as Fractal);
    this.dto = dto ? dto : new FractalDtoFactory(this.parent);
    this.form = createForm(this.dto.controls);
    this.fractals = this.createFractals(this.dto.fractals, this);
  }

  get cursor(): string {
    return this.getData(Indicators.Cursor) || this.getData(Indicators.Position);
  }

  get columns(): string[] {
    if (this.is(FractalEntities.Root) || !this.parent.getData(SplitIndicators.Columns)) {
      return Object.keys(this.dto.controls);
    }
    return this.parent.splitData(SplitIndicators.Columns);
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
    for (const indicator in this.form.value) {
      this.dto.controls[indicator].data = this.form.value[indicator];
    }
    return this.dto;
  }

  getFractal(test: string): Fractal {
    const fractal = findFractalRecursively(test, this.fractals);
    if (fractal) return fractal;
    else throw new Error(`Unable to find fractal by: ${test}`);
  }

  findFractal(test: string): Fractal | null {
    return findFractalRecursively(test, this.fractals);
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

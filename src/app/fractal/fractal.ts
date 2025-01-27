import { FormRecord } from '@angular/forms';
import { FractalDto, IFractal, IFractals, ControlDto } from '@types';
import { findFractalRecursively } from './helpers';
import { childFactory } from './factories';
import { FractalEntities, Indicators, RequiredIndicators, SplitebleIndicators } from '@constants';

export class Fractal implements IFractal {
  dto!: FractalDto;
  form!: FormRecord;
  parent!: IFractal;
  fractals: IFractals | null = null;

  get cursor(): string {
    return this.data(RequiredIndicators.Cursor) || this.data(Indicators.Position);
  }

  get columns(): string[] {
    if (this.is(FractalEntities.Root) || this.parent.split(SplitebleIndicators.Columns).length === 0) {
      return Object.keys(this.dto.controls);
    }
    return this.parent.split(SplitebleIndicators.Columns);
  }

  get fractalsArray(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  get controlsArray(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  is(test: string | object): boolean {
    if (test instanceof Fractal) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  data(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  find(test: string): IFractal | null {
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

  retrieve(test: string): IFractal {
    const fractal = findFractalRecursively(test, this.fractals);
    if (fractal) return fractal;
    else throw new Error(`Unable to find fractal by: ${test}`);
  }

  createChild(): IFractal {
    return childFactory(this);
  }
}

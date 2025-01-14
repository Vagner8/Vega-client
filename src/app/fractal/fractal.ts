import { FormRecord } from '@angular/forms';
import { FractalDto, Indicators, IFractal, IFractals, ControlDto, SplitebleIndicators, Fractals } from '@types';
import { findFractal } from './methods';

export class Fractal implements IFractal {
  dto!: FractalDto;
  form!: FormRecord;
  parent!: IFractal;
  fractals: IFractals | null = null;

  get cursor(): string {
    return this.data(Indicators.Cursor) || this.data(Indicators.Position);
  }

  get columns(): string[] {
    if (this.is(Fractals.Root) || this.parent.split(SplitebleIndicators.Columns).length === 0) {
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

  find(test: string): IFractal {
    return findFractal(test, this.fractals);
  }

  split(indicator: keyof typeof SplitebleIndicators): string[] {
    const data = this.data(indicator);
    return data ? data.split(':') : [];
  }
}

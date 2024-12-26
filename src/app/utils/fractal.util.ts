import {
  FractalDto,
  Indicators,
  ControlsDto,
  FractalStatus,
  FractalsDto,
  IFractal,
  IFractals,
  ControlDto,
} from '@types';
import { v4 } from 'uuid';

export class Fractal implements IFractal {
  dto!: FractalDto;
  parent: IFractal | null = null;
  status: FractalStatus = FractalStatus.Stable;
  fractals: IFractals | null = null;

  get list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  get controlsList(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  get cursor(): string {
    return this.data(Indicators.Cursor) || this.data(Indicators.Position);
  }

  get columns(): string[] {
    const columns = this.data(Indicators.Columns).split(':');
    if (columns) return columns;
    else throw new Error(`Unable to find columns in: ${this.cursor}`);
  }

  static create(dto: FractalDto, parent: IFractal | null): IFractal {
    const fractal = new Fractal();
    fractal.dto = dto;
    fractal.parent = parent;
    fractal.fractals = fractal.toFractals(dto.fractals, fractal);
    return fractal;
  }

  private toFractals(dto: FractalsDto | null, parent: IFractal | null): IFractals | null {
    if (!dto) return null;
    const result: IFractals = {};
    for (const indicator in dto) {
      const fractal = Fractal.create(dto[indicator], parent);
      fractal.fractals = this.toFractals(dto[indicator].fractals, fractal);
      result[indicator] = fractal;
    }
    return result;
  }

  is(test: string | object): boolean {
    if (test instanceof Fractal) return this === test;
    if (typeof test === 'object') return Object.values(test).includes(this.cursor);
    return test === this.cursor;
  }

  data(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  cloneChild(): IFractal {
    const id = v4();
    const clone = Fractal.create(
      {
        id,
        parentId: this.dto.id,
        controls: this.columns.reduce((acc: ControlsDto, indicator) => {
          acc[indicator] = {
            id: v4(),
            parentId: id,
            indicator,
            data: '',
          };
          return acc;
        }, {}),
        fractals: null,
      },
      this
    );
    clone.status = FractalStatus.New;
    return clone;
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal {
    const fractal = this.findRecursively(test, fractals);
    if (fractal) return fractal;
    else throw new Error(`Unable to find fractal by: ${test}`);
  }

  private findRecursively(test: string, fractals: IFractals | null): IFractal | null {
    if (fractals) {
      for (const key in fractals) {
        if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
        const found = this.findRecursively(test, fractals[key].fractals);
        if (found) return found;
      }
    }
    return null;
  }
}

import { FormControl, FormRecord } from '@angular/forms';
import {
  FractalDto,
  Indicators,
  ControlsDto,
  FractalStatus,
  FractalsDto,
  IFractal,
  IFractals,
  ControlDto,
  ArrayIndicators,
} from '@types';
import { v4 } from 'uuid';

export class Fractal implements IFractal {
  dto!: FractalDto;
  form: FormRecord | null = null;
  parent: IFractal | null = null;
  status: FractalStatus = FractalStatus.Stable;
  fractals: IFractals | null = null;

  get fractalsList(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  get controlsList(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  get indicators(): string[] {
    return Object.keys(this.dto.controls);
  }

  get cursor(): string {
    return this.data(Indicators.Cursor) || this.data(Indicators.Position);
  }

  array(arrayIndicators: keyof typeof ArrayIndicators): string[] {
    const array = this.data(arrayIndicators).split(':');
    if (array) return array;
    else throw new Error(`Unable to make array in: ${this.cursor}`);
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
        controls: this.array('Columns').reduce((acc: ControlsDto, indicator) => {
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

  setFrom(): IFractal {
    this.form = new FormRecord(
      this.controlsList.reduce((acc: Record<string, FormControl>, { indicator, data }) => {
        acc[indicator] = new FormControl(data);
        return acc;
      }, {})
    );
    return this;
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

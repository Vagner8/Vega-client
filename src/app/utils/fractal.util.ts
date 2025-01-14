import { FormControl, FormRecord } from '@angular/forms';
import {
  FractalDto,
  Indicators,
  ControlsDto,
  FractalsDto,
  IFractal,
  IFractals,
  ControlDto,
  GroupIndicators,
  Fractals,
} from '@types';
import { v4 } from 'uuid';

export class Fractal implements IFractal {
  dto!: FractalDto;
  form!: FormRecord;
  parent!: IFractal;
  fractals: IFractals | null = null;

  get cursor(): string {
    return this.data(Indicators.Cursor) || this.data(Indicators.Position);
  }

  get columns(): string[] {
    if (this.is(Fractals.Root) || this.parent.array(GroupIndicators.Columns).length === 0) {
      return Object.keys(this.dto.controls);
    }
    return this.parent.array(GroupIndicators.Columns);
  }

  get fractalsArray(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  get controlsArray(): ControlDto[] {
    return Object.values(this.dto.controls);
  }

  array(arrayIndicators: keyof typeof GroupIndicators): string[] {
    const data = this.data(arrayIndicators);
    return data ? data.split(':') : [];
  }

  static create(dto: FractalDto, parent: IFractal): IFractal {
    const fractal = new Fractal();
    fractal.dto = dto;
    fractal.form = fractal.getFrom();
    fractal.parent = parent;
    fractal.fractals = fractal.toFractals(dto.fractals, fractal);
    return fractal;
  }

  private toFractals(dto: FractalsDto | null, parent: IFractal): IFractals | null {
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
    return clone;
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal {
    const fractal = this.findRecursively(test, fractals);
    if (fractal) return fractal;
    else throw new Error(`Unable to find fractal by: ${test}`);
  }

  getFrom(): FormRecord {
    return new FormRecord(
      this.controlsArray.reduce((acc: Record<string, FormControl>, { indicator, data }) => {
        acc[indicator] = new FormControl(data);
        return acc;
      }, {})
    );
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

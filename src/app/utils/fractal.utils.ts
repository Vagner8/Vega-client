import { FormControl, FormGroup } from '@angular/forms';
import {
  FractalDto,
  IFractals,
  IFractal,
  ControlDtoData,
  Indicators,
  ControlsDto,
  FractalStatus,
} from '@types';
import { v4 } from 'uuid';

export class Fractal implements IFractal {
  status: FractalStatus = FractalStatus.Stable;
  cursor!: string;
  parent!: IFractal;
  fractals: IFractals | null = null;
  formGroup: FormGroup;

  constructor(public dto: FractalDto) {
    this.formGroup = this.createFormGroup();
  }

  is(test: string | object): boolean {
    return typeof test === 'object'
      ? Object.values(test).includes(this.cursor)
      : test === this.cursor;
  }

  has(indicator: string): boolean {
    return Boolean(this.dto.controls[indicator]);
  }

  data(indicator: string): ControlDtoData {
    return this.dto.controls[indicator]?.data || '';
  }

  bool(indicator: string): boolean {
    return this.data(indicator) as boolean;
  }

  split(indicator: string): string[] {
    return this.string(indicator).split(':');
  }

  sort(): string[] {
    return this.split(Indicators.Sort);
  }

  string(indicator: string): string {
    return this.data(indicator) as string;
  }

  list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal {
    const result = this.findRecursion(test, fractals);
    if (!result) throw new Error(`Unable to find fractal for the: ${test}`);
    return result;
  }

  update(): FractalDto {
    Object.entries(this.formGroup.getRawValue()).forEach(([indicator, data]) => {
      this.dto.controls[indicator].data = data as ControlDtoData;
    });
    return this.dto;
  }

  getFormControl(name: string): FormControl | null {
    return this.formGroup.get(name) as FormControl | null;
  }

  clone(): IFractal {
    const index = (++this.list().length).toString();
    const cloneId = v4();
    const controls = this.sort().reduce((acc: ControlsDto, indicator) => {
      acc[indicator] = {
        id: v4(),
        parentId: cloneId,
        indicator,
        data: indicator === Indicators.Position ? index : '',
      };
      return acc;
    }, {});

    const row = new Fractal({
      id: cloneId,
      parentId: this.dto.id,
      controls,
      fractals: null,
    });
    row.cursor = index;
    row.status = FractalStatus.New;
    row.parent = this;
    if (this.fractals) {
      this.fractals[index] = row;
    } else {
      this.fractals = { [index]: row };
    }
    return row;
  }

  private findRecursion(test: string, fractals: IFractals | null): IFractal | null {
    if (fractals) {
      for (const key in fractals) {
        if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
        const found = this.findRecursion(test, fractals[key].fractals);
        if (found) return found;
      }
    }
    return null;
  }

  private createFormGroup(): FormGroup {
    return new FormGroup(
      Object.entries(this.dto.controls).reduce(
        (acc: Record<string, FormControl>, [indicator, control]) => {
          const value = this.has(Indicators.Select)
            ? this.split(Indicators.Select)[0]
            : control.data;
          acc[indicator] = new FormControl(value);
          return acc;
        },
        {}
      )
    );
  }
}

import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FractalDto, IFractals, IFractal, Indicators, ControlsDto, FractalStatus } from '@types';
import { v4 } from 'uuid';

export class Fractal implements IFractal {
  status: FractalStatus = FractalStatus.Stable;
  cursor!: string;
  parent!: IFractal;
  fractals: IFractals | null = null;
  formGroup: FormGroup;
  formArray: FormArray<FormGroup>;

  constructor(public dto: FractalDto) {
    this.formGroup = this.createFormGroup();
    this.formArray = new FormArray<FormGroup>(
      this.fractals ? Object.values(this.fractals).map(fractal => fractal.formGroup) : []
    );
  }

  is(test: string | object): boolean {
    return typeof test === 'object'
      ? Object.values(test).includes(this.cursor)
      : test === this.cursor;
  }

  has(indicator: string): boolean {
    return Boolean(this.dto.controls[indicator]);
  }

  data(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  columns(): string[] {
    return this.check(
      this.data(Indicators.Columns).split(':'),
      `Unable to find columns in: ${this.cursor}`
    );
  }

  list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal {
    return this.check(this.findRecursion(test, fractals), `Unable to find fractal by: ${test}`);
  }

  update(): FractalDto {
    Object.entries(this.formGroup.getRawValue()).forEach(([indicator, data]) => {
      this.dto.controls[indicator].data = data as string;
    });
    return this.dto;
  }

  getFormControl(name: string): FormControl | null {
    return this.formGroup.get(name) as FormControl | null;
  }

  clone(): IFractal {
    const index = (++this.list().length).toString();
    const cloneId = v4();
    const controls = this.columns().reduce((acc: ControlsDto, indicator) => {
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

  indicators(): string[] {
    return Object.keys(this.dto.controls);
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
          acc[indicator] = new FormControl(control.data);
          return acc;
        },
        {}
      )
    );
  }

  private check<T>(data: T | null, massage: string): T {
    if (!data) throw new Error(`Massage: ${massage}.\nCursor: ${this.cursor}`);
    return data;
  }
}

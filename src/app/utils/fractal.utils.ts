import { FormArray, FormControl, FormRecord } from '@angular/forms';
import { FractalDto, IFractals, IFractal, Indicators, ControlsDto, FractalStatus } from '@types';
import { v4 } from 'uuid';

export class Fractal implements IFractal {
  status: FractalStatus = FractalStatus.Stable;
  fractals: IFractals | null = null;
  formArray = new FormArray<FormRecord>([]);
  formRecord = new FormRecord({});

  constructor(
    public dto: FractalDto,
    public parent: IFractal | null
  ) {
    for (const indicator in this.dto.controls) {
      this.formRecord.addControl(indicator, new FormControl(this.data(indicator)));
    }
    this.parent && this.parent.formArray.push(this.formRecord);
  }

  get list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  get cursor(): string {
    return this.data(Indicators.Cursor) || this.data(Indicators.Position);
  }

  get columns(): string[] {
    return this.check(
      this.data(Indicators.Columns).split(':'),
      `Unable to find columns in: ${this.cursor}`
    );
  }

  get indicators(): string[] {
    return Object.keys(this.dto.controls);
  }

  is(test: string | object): boolean {
    return typeof test === 'object'
      ? Object.values(test).includes(this.cursor)
      : test === this.cursor;
  }

  data(indicator: string): string {
    return this.dto.controls[indicator]?.data || '';
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal {
    return this.check(this.findRecursion(test, fractals), `Unable to find fractal by: ${test}`);
  }

  update(): IFractal {
    for (const indicator in this.dto.controls) {
      this.dto.controls[indicator].data = this.formRecord.get(indicator)?.value;
    }
    return this;
  }

  getFormControl(indicator: string): FormControl {
    return this.check(
      this.formRecord.get(indicator) as FormControl,
      `Unable to get form control be indicator ${indicator}`
    );
  }

  addChild(child: IFractal): void {
    const position = this.fractals ? `${++this.list.length}` : '1';
    child.dto.controls[Indicators.Position].data = position;
    child.formRecord.get(Indicators.Position)?.setValue(position);
    if (this.fractals) this.fractals[position] = child;
    else this.fractals = { [position]: child };
  }

  cloneChild(): IFractal {
    const id = v4();
    const clone = new Fractal(
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

  private check<T>(data: T | null, massage: string): T {
    if (!data) throw new Error(`Massage: ${massage}.\nCursor: ${this.cursor}`);
    return data;
  }
}

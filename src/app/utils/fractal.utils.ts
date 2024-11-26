import { FormControl, FormGroup } from '@angular/forms';
import { FractalDto, IFractals, IFractal, Indicators } from '@types';

export class Fractal implements IFractal {
  cursor!: string;
  isClone?: boolean;
  formGroup: FormGroup;

  constructor(
    public dto: FractalDto,
    public fractals: IFractals | null
  ) {
    this.formGroup = this.getFormGroup();
  }

  is(test: string | object): boolean {
    return typeof test === 'object'
      ? Object.values(test).includes(this.cursor)
      : test === this.cursor;
  }

  list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  data(indicator: string): string {
    return this.dto.controls?.[indicator]?.data || '';
  }

  sort(): string[] {
    return this.data(Indicators.Sort).split(':');
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal | null {
    if (fractals) {
      for (const key in fractals) {
        if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
        const found = this.find(test, fractals[key].fractals);
        if (found) return found;
      }
    }
    return null;
  }

  update(): FractalDto {
    Object.entries(this.formGroup.getRawValue()).forEach(([indicator, data]) => {
      this.dto.controls[indicator].data = data as string;
    });
    return this.dto;
  }

  private getFormGroup(): FormGroup {
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
}

import { FormControl, FormGroup } from '@angular/forms';
import { FractalDto, IFractals, IFractal, ControlDtoData, Indicators } from '@types';

export class Fractal implements IFractal {
  cursor!: string;
  isClone?: boolean;
  formGroup: FormGroup;

  constructor(
    public dto: FractalDto,
    public fractals: IFractals | null
  ) {
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

  list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  data(indicator: string): ControlDtoData {
    return this.dto.controls[indicator].data;
  }

  bool(indicator: string): boolean {
    return this.data(indicator) as boolean;
  }

  array(indicator: string): string[] {
    return this.string(indicator).split(':');
  }

  string(indicator: string): string {
    return this.data(indicator) as string;
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

  getFormControl(name: string): FormControl | null {
    return this.formGroup.get(name) as FormControl | null;
  }

  private createFormGroup(): FormGroup {
    return new FormGroup(
      Object.entries(this.dto.controls).reduce(
        (acc: Record<string, FormControl>, [indicator, control]) => {
          const value = this.has(Indicators.Select)
            ? this.array(Indicators.Select)[0]
            : control.data;
          acc[indicator] = new FormControl(value);
          return acc;
        },
        {}
      )
    );
  }
}

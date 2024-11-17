import { FormControl, FormGroup } from '@angular/forms';
import { FractalDto, IFractals, IFractal, FractalFormGroup } from '@types';

export class Fractal implements IFractal {
  cursor!: string;
  isClone?: boolean;
  formGroup: FractalFormGroup;

  constructor(
    public dto: FractalDto,
    public fractals: IFractals | null
  ) {
    this.formGroup = this.getFormGroup();
  }

  list(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  data(indicator: string): string {
    return this.dto.controls?.[indicator]?.data || '';
  }

  split<T extends []>(indicator: string): T {
    return this.data(indicator).split(':') as T;
  }

  find(test: string, fractals: IFractals | null = this.fractals): IFractal | null {
    if (fractals) {
      for (const key in fractals) {
        if (fractals[key].isCursor(test) || fractals[key].dto.id === test) return fractals[key];
        const found = this.find(test, fractals[key].fractals);
        if (found) return found;
      }
    }
    return null;
  }

  isType(type: object): boolean {
    return Object.values(type).some(name => this.cursor === name);
  }

  isCursor(data: string): boolean {
    return this.cursor === data;
  }

  private getFormGroup(): FractalFormGroup {
    return {
      data: new FormGroup(
        Object.entries(this.dto.controls).reduce(
          (acc, [indicator, control]) => {
            acc[indicator] = new FormControl(control.data);
            return acc;
          },
          {} as Record<string, FormControl>
        )
      ),
      get(indicator: string) {
        return this.data.get(indicator) as FormControl;
      },
    };
  }
}

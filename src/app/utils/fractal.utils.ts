import { FormControl, FormGroup } from '@angular/forms';
import {
  Fractal,
  FractalActions,
  FractalDto,
  FractalFormControl,
  FractalFormControls,
  Indicators,
} from '@types';
import { isKeyof } from '@utils';

export class FractalClass implements Fractal {
  icon: string;
  sort: string[];
  cursor: string;
  confirmation: boolean;

  isClone: boolean;
  formGroup: FormGroup<FractalFormControls>;

  actions: FractalActions;

  constructor(
    public dto: FractalDto,
    public fractals: Fractal[]
  ) {
    this.icon = this.data(Indicators.Icon);
    this.sort = this.data(Indicators.Sort).split(':');
    this.cursor = this.data(Indicators.Cursor);
    this.confirmation = Boolean(this.data(Indicators.Confirmation));

    this.actions = {
      clicked: null,
    };

    this.isClone = false;
    this.formGroup = this.createFormGroup();
  }

  checkCursor(test: string): boolean {
    return this.cursor === test;
  }

  checkType(type: object): boolean {
    return Object.values(type).some(name => this.cursor === name);
  }

  checkActions(actions: Partial<FractalActions>): boolean {
    let result = false;
    for (const key in actions) {
      if (isKeyof(actions, key)) {
        result = this.actions[key] === actions[key];
        if (!result) break;
      }
    }
    return result;
  }

  find(test: string, fractals: Fractal[] | null = this.fractals): Fractal | null {
    if (fractals) {
      for (const fractal of fractals) {
        if (fractal.checkCursor(test) || fractal.dto.id === test) return fractal;
        const found = this.find(test, fractal.fractals);
        if (found) return found;
      }
    }
    return null;
  }

  data(indicator: string): string {
    const control = this.dto.controls.find(control => control.indicator === indicator);
    return control ? control.data : '';
  }

  formControl(indicator: string): FractalFormControl {
    return this.formGroup.get(indicator) as FractalFormControl;
  }

  private createFormGroup(): FormGroup<FractalFormControls> {
    return new FormGroup<FractalFormControls>(
      Object.values(this.dto.controls).reduce((acc, control) => {
        acc[control.indicator] = new FormControl(control.data);
        return acc;
      }, {} as FractalFormControls)
    );
  }
}

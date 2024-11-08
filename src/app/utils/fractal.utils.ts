import { FormControl, FormGroup } from '@angular/forms';
import { FractalService } from '@services';
import {
  Click,
  Data,
  Fractal,
  FractalActionFields,
  FractalDto,
  FractalFilterProps,
  FractalFormControl,
  FractalFormControls,
  Indicators,
} from '@types';
import { isKeyof } from '@utils';

export class FractalClass implements Fractal {
  name: string;
  icon: string;
  sort: string[];

  list: Fractal[];
  shape: Fractal | null;
  formGroup: FormGroup<FractalFormControls>;

  clicked: Click | null;

  constructor(
    public dto: FractalDto,
    public fractals: Fractal[] | null,
    private fs: FractalService
  ) {
    this.name = this.data(Indicators.FractalName);
    this.icon = this.data(Indicators.Icon);
    this.sort = this.data(Indicators.Sort).split(':');

    this.clicked = null;

    const { list, shape } = this.filter();
    this.list = list;
    this.shape = shape;
    this.formGroup = new FormGroup<FractalFormControls>(this.createFormGroup());
  }

  checkName(test: string): boolean {
    return this.name === test;
  }

  checkType(type: object): boolean {
    return Object.values(type).some(name => this.name === name);
  }

  checkActions(actions: Partial<FractalActionFields>): boolean {
    let result = false;
    for (const key in actions) {
      if (isKeyof(actions, key)) {
        result = this[key] === actions[key];
        if (!result) break;
      }
    }
    return result;
  }

  find(nameOrId: string, fractals: Fractal[] | null = this.fractals): Fractal | null {
    if (fractals) {
      for (const fractal of fractals) {
        if (fractal.name === nameOrId || fractal.dto.id === nameOrId) return fractal;
        const found = this.find(nameOrId, fractal.fractals);
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

  private createFormGroup(): FractalFormControls {
    return Object.values(this.dto.controls).reduce((acc, control) => {
      acc[control.indicator] = new FormControl(control.data);
      return acc;
    }, {} as FractalFormControls);
  }

  private filter(): FractalFilterProps {
    if (!this.fractals) return { list: [], shape: null };
    return this.fractals.reduce(
      (acc, fractal) => {
        if (fractal.data(Indicators.FractalName) === Data.Shape) acc.shape = fractal;
        else acc.list.push(fractal);
        return acc;
      },
      { list: [], shape: null } as FractalFilterProps
    );
  }
}

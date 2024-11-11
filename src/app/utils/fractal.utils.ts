import { FormControl, FormGroup } from '@angular/forms';
import { FractalService } from '@services';
import {
  Click,
  Fractal,
  FractalActionFields,
  FractalDto,
  FractalFormControl,
  FractalFormControls,
  Indicators,
  Modifiers,
} from '@types';
import { isKeyof } from '@utils';
import { v4 } from 'uuid';

export class FractalClass implements Fractal {
  name: string;
  icon: string;
  sort: string[];

  isClone: boolean;
  formGroup: FormGroup<FractalFormControls>;
  confirmation: boolean;

  clicked: Click | null;

  constructor(
    public dto: FractalDto,
    public fractals: Fractal[],
    private fs: FractalService
  ) {
    this.name = this.data(Indicators.FractalName);
    this.icon = this.data(Indicators.Icon);
    this.sort = this.data(Indicators.Sort).split(':');

    this.clicked = null;

    this.isClone = false;
    this.formGroup = new FormGroup<FractalFormControls>(this.createFormGroup());
    this.confirmation = [Modifiers.Delete, Modifiers.Save].some(name => name === this.name);
  }

  clone(): Fractal {
    const fractalId = v4();
    const newFractal = new FractalClass(
      {
        id: fractalId,
        parentId: this.dto.id,
        controls: this.sort.map(indicator => ({
          id: v4(),
          parentId: fractalId,
          indicator,
          data: '',
        })),
        fractals: [],
      },
      [],
      this.fs
    );
    newFractal.isClone = true;
    return newFractal;
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
}

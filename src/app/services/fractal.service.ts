import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Click,
  ControlDto,
  Fractal,
  FractalDto,
  FractalFormControl,
  FractalFormControls,
  FractalActionFields,
  Indicators,
} from '@types';
import { isKeyof } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  root!: FractalDto;

  toFractal(dto: FractalDto): Fractal {
    this.root = dto;
    return this.create(dto, this.toFractals(dto.fractals));
  }

  private toFractals(fractals: FractalDto[] | null): Fractal[] | null {
    const result: Fractal[] = [];
    if (!fractals) return null;
    for (const key in fractals) {
      result[key] = this.create(fractals[key], this.toFractals(fractals[key].fractals));
    }
    return result;
  }

  private create(dto: FractalDto, fractals: Fractal[] | null): Fractal {
    return new (class implements Fractal {
      id: string;
      controls: ControlDto[];
      fractals: Fractal[] | null;

      name: string;
      icon: string;
      sort: string[];

      clicked: Click | null;

      formGroup: FormGroup<FractalFormControls>;

      constructor({ id, controls }: FractalDto, fractals: Fractal[] | null) {
        this.id = id;
        this.controls = controls;
        this.fractals = fractals;

        this.name = this.data(Indicators.FractalName);
        this.icon = this.data(Indicators.Icon);
        this.sort = this.data(Indicators.Sort).split(':');

        this.clicked = null;

        this.formGroup = new FormGroup<FractalFormControls>(this.createFormGroup());
        this.formGroup.valueChanges.subscribe(valueChanges => {
          console.log('🚀 ~ valueChanges:', valueChanges);
        });
      }

      get fractalsList(): Fractal[] {
        return this.fractals ? Object.values(this.fractals) : [];
      }

      get controlsList(): ControlDto[] {
        return Object.values(this.controls);
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
            if (fractal.name === nameOrId || fractal.id === nameOrId) return fractal;
            const found = this.find(nameOrId, fractal.fractals);
            if (found) return found;
          }
        }
        return null;
      }

      data(indicator: string): string {
        const control = this.controls.find(control => control.indicator === indicator);
        return control ? control.data : '';
      }

      getFormControl(indicator: string): FractalFormControl {
        return this.formGroup.get(indicator) as FractalFormControl;
      }

      private createFormGroup(): FractalFormControls {
        return this.controlsList.reduce((acc, control) => {
          acc[control.indicator] = new FormControl(control.data);
          return acc;
        }, {} as FractalFormControls);
      }
    })(dto, fractals);
  }
}

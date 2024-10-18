import { Injectable } from '@angular/core';
import {
  Click,
  ControlDto,
  Fractal,
  FractalDto,
  FractalToCheckFields,
  Indicators,
  YesNo,
} from '@types';
import { hasOwnProperty, isKeyof } from '@utils';

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

      constructor({ id, controls }: FractalDto, fractals: Fractal[] | null) {
        this.id = id;
        this.controls = controls;
        this.fractals = fractals;

        this.name = this.data(Indicators.FractalName);
        this.icon = this.data(Indicators.Icon);
        this.sort = this.data(Indicators.Sort).split(':');

        this.clicked = null;
      }

      get arr(): Fractal[] {
        return this.fractals ? Object.values(this.fractals) : [];
      }

      is(type: object, { yes, no }: YesNo): boolean {
        const result = hasOwnProperty(type, this.name);
        result ? yes?.() : no?.();
        return result;
      }

      was(fields: Partial<FractalToCheckFields>, { yes, no }: YesNo): boolean {
        let result = false;
        for (const key in fields) {
          if (isKeyof(fields, key)) {
            result = this[key] === fields[key];
            if (!result) break;
          }
        }

        result ? yes?.() : no?.();
        return result;
      }

      find(name: string, fractals: Fractal[] | null = this.fractals): Fractal | null {
        if (fractals) {
          for (const fractal of fractals) {
            if (fractal.name === name) return fractal;
            const found = this.find(name, fractal.fractals);
            if (found) return found;
          }
        }
        return null;
      }

      data(indicator: string): string {
        const control = this.controls.find(control => control.indicator === indicator);
        return control ? control.data : 'default';
      }
    })(dto, fractals);
  }
}

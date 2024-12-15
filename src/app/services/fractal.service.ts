import { Injectable, signal } from '@angular/core';
import { FractalDto, FractalsDto, IFractal, IFractals } from '@types';
import { Fractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  $root = signal<IFractal | null>(null);

  get root(): IFractal {
    const root = this.$root();
    if (!root) throw new Error('');
    return root;
  }

  toFractal(dto: FractalDto): IFractal {
    const fractal = new Fractal(dto);
    fractal.cursor = 'Root';
    fractal.parent = fractal;
    fractal.fractals = this.toFractals(dto.fractals, fractal);
    return fractal;
  }

  private toFractals(dto: FractalsDto | null, parent: IFractal): IFractals | null {
    if (!dto) return null;
    const result: IFractals = {};
    for (const indicator in dto) {
      const fractal = new Fractal(dto[indicator]);
      fractal.fractals = this.toFractals(fractal.dto.fractals, fractal);
      fractal.parent = parent;
      fractal.cursor = indicator;
      result[indicator] = fractal;
    }
    return result;
  }
}

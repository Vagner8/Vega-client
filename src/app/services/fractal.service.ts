import { Injectable } from '@angular/core';
import { FractalDto, Fractals, FractalsDto } from '@types';
import { Fractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  toFractal(fractal: FractalDto): Fractal {
    const { fractals, controls } = fractal;
    return new Fractal({
      ...fractal,
      controls,
      fractals: this.toFractals(fractals),
    });
  }

  private toFractals(fractals: FractalsDto | null): Fractals | null {
    if (!fractals) return null;
    const result: Fractals | null = {};
    for (const key in fractals) {
      result[key] = this.toFractal(fractals[key]);
    }
    return result;
  }
}

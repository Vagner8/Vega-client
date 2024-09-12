import { FractalDto, Fractals, FractalsDto } from '@types';
import { Fractal } from './fractal.utils';

export class FractalFactory {
  static create(fractal: FractalDto): Fractal {
    return new Fractal({
      ...fractal,
      fractals: this.toFractals(fractal.fractals),
    });
  }

  private static toFractals(fractals: FractalsDto | null): Fractals | null {
    if (!fractals) return null;
    const result: Fractals | null = {};
    for (const key in fractals) {
      result[key] = this.create(fractals[key]);
    }
    return result;
  }
}

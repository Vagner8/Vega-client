import { Injectable } from '@angular/core';
import { FractalDto, FractalsDto, IFractals } from '@types';
import { Fractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  toFractal(dto: FractalDto): Fractal {
    return new Fractal(dto, this.toFractals(dto.fractals));
  }

  private toFractals(fractals: FractalsDto | null): IFractals | null {
    if (!fractals) return null;
    const result: IFractals = {};
    for (const indicator in fractals) {
      const fractal = new Fractal(
        fractals[indicator],
        this.toFractals(fractals[indicator].fractals)
      );
      fractal.cursor = indicator;
      result[indicator] = fractal;
    }
    return result;
  }
}

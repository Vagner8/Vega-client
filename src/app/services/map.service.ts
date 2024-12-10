import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FractalDto, FractalsDto, IFractal, IFractals } from '@types';
import { Fractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  router = inject(Router);

  toFractal(dto: FractalDto): Fractal {
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

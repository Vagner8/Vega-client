import { Injectable, signal } from '@angular/core';
import { FractalDto, Fractals, FractalsDto, IFractal } from '@types';
import { Controls, Fractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  root = signal<IFractal | null>(null);
  rootDto = signal<FractalDto | null>(null);

  onInit = (fractal: FractalDto) => {
    this.root.set(this.toFractal(fractal));
    this.rootDto.set(fractal);
  };

  private toFractal(fractal: FractalDto): Fractal {
    const { fractals, controls } = fractal;
    return new Fractal({
      ...fractal,
      controls: new Controls(controls),
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

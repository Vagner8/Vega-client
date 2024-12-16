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
    if (!root) throw new Error('Unable to get Root fractal');
    return root;
  }

  toFractal(dto: FractalDto): IFractal {
    const root = new Fractal(dto, null);
    root.fractals = this.toFractals(dto.fractals, root);
    return root;
  }

  private toFractals(dto: FractalsDto | null, parent: IFractal): IFractals | null {
    if (!dto) return null;
    const result: IFractals = {};
    for (const indicator in dto) {
      const fractal = new Fractal(dto[indicator], parent);
      fractal.fractals = this.toFractals(dto[indicator].fractals, fractal);
      result[indicator] = fractal;
    }
    return result;
  }
}

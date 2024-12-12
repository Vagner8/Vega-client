import { Injectable, signal, WritableSignal } from '@angular/core';
import { FractalDto, FractalsDto, IFractal, IFractals } from '@types';
import { Fractal } from '@utils';

interface Signals {
  root: WritableSignal<IFractal | null>;
}

@Injectable({
  providedIn: 'root',
})
export class FractalService implements Signals {
  root = signal<IFractal | null>(null);

  get(name: keyof Signals): IFractal {
    const fractal = this[name]();
    if (!fractal) throw new Error(`Unable to get fractal with name: ${name}`);
    return fractal;
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

import { Pipe, PipeTransform } from '@angular/core';
import { FractalDto, FractalNames } from '@types';

@Pipe({
  name: 'fp',
  pure: true,
  standalone: true,
})
export class FractalPipe implements PipeTransform {
  transform(fractal: FractalDto, name: FractalNames): FractalDto {
    return this.find(fractal, name);
  }

  find(fractal: FractalDto, name: FractalNames): FractalDto {
    for (const key in fractal.fractals) {
      if (key === name) return fractal.fractals[name];
      else this.find(fractal.fractals[key], name);
    }
    return fractal;
  }
}

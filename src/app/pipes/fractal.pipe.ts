import { Pipe, PipeTransform } from '@angular/core';
import { FractalDto, FractalNames } from '@types';

@Pipe({
  name: 'fp',
  pure: true,
  standalone: true,
})
export class FractalPipe implements PipeTransform {
  transform(fractal: FractalDto, name: FractalNames): FractalDto {
    const result = this.find(fractal, name);
    if (!result) throw new Error(`No fractal with name: ${name}`);
    return result;
  }

  find(fractal: FractalDto, name: FractalNames): FractalDto | null {
    if (name in fractal.fractals) {
      return fractal.fractals[name];
    }
    for (const fractalKey in fractal.fractals) {
      const foundFractal = this.find(fractal.fractals[fractalKey], name);
      if (foundFractal) return foundFractal;
    }
    return null;
  }
}

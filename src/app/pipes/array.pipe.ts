import { Pipe, PipeTransform } from '@angular/core';
import { FractalDto } from '@types';

@Pipe({
  name: 'ap',
  standalone: true,
})
export class ArrayPipe implements PipeTransform {
  transform(fractal: FractalDto): FractalDto[] {
    return Object.values(fractal.fractals);
  }
}

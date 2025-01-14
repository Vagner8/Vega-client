import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SelectService extends BaseService {
  $fractals = signal<IFractal[]>([]);

  set(row: IFractal): void {
    this.$fractals.set([]);
    this.$fractal.update(prev => (prev === row ? null : row));
  }

  push(fractal: IFractal): void {
    this.$fractal.set(null);
    this.$fractals.update(prev =>
      prev.includes(fractal) ? prev.filter(prevFractal => prevFractal !== fractal) : [...prev, fractal]
    );
  }

  select(fractal: IFractal): void {
    this.$fractal.set(null);
    this.$fractals.update(prev => (prev.length > 0 ? [] : fractal.parent.fractalsArray));
  }

  reset(): void {
    this.$fractal.set(null);
    this.$fractals.set([]);
  }
}

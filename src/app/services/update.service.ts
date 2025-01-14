import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  $fractal = signal<IFractal | null>(null);
  $fractals = signal<IFractal[]>([]);

  push(fractal: IFractal): void {
    this.$fractals.update(prev =>
      prev.includes(fractal) ? prev.filter(prevFractal => prevFractal !== fractal) : [...prev, fractal]
    );
  }

  select(fractal: IFractal): void {
    this.$fractals.update(prev => (prev.length > 0 ? [] : fractal.parent.fractalsArray));
  }

  reset(): void {
    this.$fractals.set([]);
    this.$fractal.set(null);
  }
}

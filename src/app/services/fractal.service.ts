import { Injectable, signal } from '@angular/core';
import { FractalDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  dto = signal<FractalDto | null>(null);
  name = signal<string>('');
  selected = signal<FractalDto[]>([]);

  add(fractal: FractalDto): void {
    this.selected.update((state) => [...state, fractal]);
  }

  delete(fractal: FractalDto): void {
    this.selected.update((state) => state.filter((f) => f !== fractal));
  }

  has(fractal: FractalDto): boolean {
    return this.selected().includes(fractal);
  }

  clean(): void {
    this.selected.set([]);
  }
}

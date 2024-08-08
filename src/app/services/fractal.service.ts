import { Injectable, signal } from '@angular/core';
import { FractalDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  data = signal<FractalDto | null>(null);
  selected = signal<FractalDto[]>([]);

  add(fractal: FractalDto): void {
    this.selected.update((state) => [...state, fractal]);
  }

  delete(fractal: FractalDto): void {
    this.selected.update((state) => state.filter((f) => f !== fractal));
  }

  clear(): void {
    this.selected.set([]);
  }
}

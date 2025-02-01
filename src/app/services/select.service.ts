import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  $toAdd = signal<Fractal[]>([]);
  $toShow = signal<Fractal | null>(null);
  $toUpdate = signal<Fractal[]>([]);

  setParent(fractal: Fractal | null): void {
    this.$toUpdate.set([]);
    this.$toShow.set(fractal);
  }

  setToAdd(fractal: Fractal): void {
    this.$toAdd.update(prev => [...prev, fractal]);
  }

  setToUpdate(fractal: Fractal): void {
    this.$toUpdate.update(prev =>
      prev.includes(fractal) ? prev.filter(child => child !== fractal) : [...prev, fractal]
    );
  }

  select(fractal: Fractal): void {
    this.$toUpdate.update(prev => (prev.length > 0 ? [] : fractal.parent.fractalsArray));
  }

  reset(): void {
    this.$toAdd.set([]);
    this.$toUpdate.set([]);
  }

  init({ root, Pages }: { root: Fractal; Pages: string }): void {
    this.$toShow.set(root.getFractal(Pages));
  }
}

import { Injectable, signal } from '@angular/core';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  $parent = signal<Fractal | null>(null);

  $toAdd = signal<Fractal[]>([]);
  $toUpdate = signal<Fractal[]>([]);

  setParent(fractal: Fractal | null): void {
    this.$toUpdate.set([]);
    this.$parent.set(fractal);
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
    // this.$fractal.set(null);
    this.$toUpdate.set([]);
  }

  init({ root, Collections }: { root: Fractal; Collections: string }): void {
    this.$parent.set(root.retrieve(Collections));
  }
}

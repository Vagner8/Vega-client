import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  $parent = signal<IFractal | null>(null);

  $toAdd = signal<IFractal[]>([]);
  $toUpdate = signal<IFractal[]>([]);
  $toDelete = signal<IFractal[]>([]);

  setParent(fractal: IFractal | null): void {
    this.$toUpdate.set([]);
    this.$parent.set(fractal);
  }

  setToAdd(fractal: IFractal): void {
    this.$toAdd.update(prev => [...prev, fractal]);
  }

  setToUpdate(fractal: IFractal): void {
    this.$toUpdate.update(prev =>
      prev.includes(fractal) ? prev.filter(child => child !== fractal) : [...prev, fractal]
    );
  }

  select(fractal: IFractal): void {
    this.$toUpdate.update(prev => (prev.length > 0 ? [] : fractal.parent.fractalsArray));
  }

  reset(): void {
    // this.$fractal.set(null);
    this.$toUpdate.set([]);
  }

  init({ root, Collections }: { root: IFractal; Collections: string }): void {
    this.$parent.set(root.find(Collections));
  }
}

import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  $parent = signal<IFractal | null>(null);
  $children = signal<IFractal[]>([]);

  async set(fractal: IFractal | null): Promise<void> {
    this.$children.set([]);
    this.$parent.set(fractal);
  }

  push(fractal: IFractal): void {
    this.$children.update(prev =>
      prev.includes(fractal) ? prev.filter(child => child !== fractal) : [...prev, fractal]
    );
  }

  select(fractal: IFractal): void {
    this.$children.update(prev => (prev.length > 0 ? [] : fractal.parent.fractalsArray));
  }

  reset(): void {
    // this.$fractal.set(null);
    this.$children.set([]);
  }

  init({ root, Collections }: { root: IFractal; Collections: string }): void {
    this.$parent.set(root.find(Collections));
  }
}

import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Fractal } from './fractal.utils';

export abstract class State<S, P> {
  protected router = inject(Router);
  signal = signal<S | null>(null);

  abstract set(state: P | null): Promise<void>;
  abstract navigate(state: P | null): Promise<void>;

  is(test: string | object): boolean {
    const data = this.signal();
    if (data instanceof Fractal) {
      return typeof test === 'object'
        ? Object.values(test).includes(data.cursor)
        : data.cursor === test;
    }
    return data === test;
  }
}

import { inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Fractal } from './fractal.utils';

export abstract class State<T> {
  protected router = inject(Router);
  signal: WritableSignal<T | null>;

  constructor(defaultState: T | null = null) {
    this.signal = signal(defaultState);
  }

  abstract navigate(state: T | null): Promise<void>;

  async set(state: T | null): Promise<void> {
    this.signal.set(state);
    this.navigate(state);
  }

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

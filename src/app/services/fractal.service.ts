import { Injectable, signal, WritableSignal } from '@angular/core';
import { IFractal } from '@types';

interface Signals {
  root: WritableSignal<IFractal | null>;
  taps: WritableSignal<IFractal | null>;
  list: WritableSignal<IFractal | null>;
  modifier: WritableSignal<IFractal | null>;
}

@Injectable({
  providedIn: 'root',
})
export class FractalService implements Signals {
  root = signal<IFractal | null>(null);
  pages!: IFractal;
  manager!: IFractal;
  modifiers!: IFractal;

  taps = signal<IFractal | null>(null);
  list = signal<IFractal | null>(null);
  modifier = signal<IFractal | null>(null);
  managerEvent = signal('');

  get(name: keyof Signals): IFractal {
    const fractal = this[name]();
    if (!fractal) throw new Error(`Unable to get fractal with name: ${name}`);
    return fractal;
  }
}

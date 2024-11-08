import { WritableSignal } from '@angular/core';
import { Fractal, FractalActionFields, FractalNull } from '@types';
import { Subject } from 'rxjs';

export interface State {
  $fractals: WritableSignal<Fractal[]>;
  $fractal: WritableSignal<FractalNull>;
  fractal$: Subject<FractalNull>;
  get fractal(): Fractal;
  set(fractal: FractalNull, actions?: Partial<FractalActionFields>): Promise<State>;
}

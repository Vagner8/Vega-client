import { WritableSignal } from '@angular/core';
import { Fractal, FractalActionFields, FractalNull } from '@types';
import { Subject } from 'rxjs';

export interface State {
  $fractal: WritableSignal<FractalNull>;
  fractal$: Subject<FractalNull>;
  fractal: Fractal;
  set(fractal: FractalNull, actions?: Partial<FractalActionFields>): State;
}

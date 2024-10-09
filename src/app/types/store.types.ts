import { WritableSignal } from '@angular/core';
import { Click, FractalType, IFractal } from '@types';
import { Subject } from 'rxjs';

export type Act = Click;

export interface StoreAct {
  value: string | null;
  is(test: string): boolean;
}

export interface StoreActs {
  click: StoreAct;
}

export interface Store {
  set: Set<IFractal>;
  signal: WritableSignal<FractalType>;
  acts: StoreActs;
  observable$: Subject<FractalType>;
  add(fractal: FractalType, act?: Act): void;
}

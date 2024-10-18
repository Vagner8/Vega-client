import { Injectable, signal } from '@angular/core';
import { Fractal, FractalActionFields, FractalNull, State } from '@types';
import { isKeyof } from '@utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  root = this.create();
  pageTap = this.create();
  managerTap = this.create();
  sidenavTaps = this.create();
  modifierTap = this.create();

  private create(): State {
    return new (class implements State {
      $fractal = signal<FractalNull>(null);
      fractal$ = new Subject<FractalNull>();
      fractal!: Fractal;

      constructor(private ss: StateService) {
        if (this.ss?.root) this.fractal = this.ss.root.fractal;
      }

      set(fractal: FractalNull, actions?: Partial<FractalActionFields>): State {
        if (actions && fractal) {
          Object.entries(actions).forEach(([key, value]) => {
            if (isKeyof<FractalActionFields>(fractal, key)) {
              fractal[key] = value;
            }
          });
        }
        if (fractal) this.fractal = fractal;
        this.$fractal.set(fractal);
        this.fractal$.next(fractal);
        return this;
      }
    })(this);
  }
}

import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Fractal, FractalActionFields, FractalNull, Modifiers, Pages, Roots, State } from '@types';
import { isKeyof } from '@utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  root = this.create();
  rowTap = this.create();
  pageTap = this.create();
  managerTap = this.create();
  sidenavTaps = this.create();
  modifierTap = this.create();

  clickedRows = new Set<Fractal>();

  constructor(private router: Router) {}

  private create(): State {
    return new (class implements State {
      $fractal = signal<FractalNull>(null);
      fractal$ = new Subject<FractalNull>();
      fractal!: Fractal;

      constructor(private ss: StateService) {
        if (this.ss?.root) this.fractal = this.ss.root.fractal;
      }

      set(fractal: FractalNull, actions?: Partial<FractalActionFields>): State {
        if (fractal) {
          if (actions) {
            Object.entries(actions).forEach(([key, value]) => {
              if (isKeyof<FractalActionFields>(fractal, key)) fractal[key] = value;
            });
          }

          fractal.is(Pages).yes(() => {
            this.ss.router.navigate([fractal.name], {
              queryParams: { [Roots.Manager]: this.ss.managerTap.fractal.clicked },
            });
          });

          fractal.is(Modifiers).yes(() => {
            this.ss.router.navigate([this.ss.pageTap.fractal.name, fractal.name], {
              queryParamsHandling: 'merge',
            });
          });

          fractal.is(Roots.Manager).yes(() => {
            this.ss.router.navigate([], {
              queryParams: { [Roots.Manager]: fractal.clicked },
              queryParamsHandling: 'merge',
            });
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

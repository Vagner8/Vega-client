import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Fractal,
  FractalActionFields,
  FractalNull,
  Modifiers,
  Pages,
  Queries,
  Roots,
  State,
} from '@types';
import { isKeyof } from '@utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  row = this.create();
  root = this.create();
  page = this.create();
  manager = this.create();
  sidenavs = this.create();
  modifier = this.create();

  constructor(private router: Router) {}

  private create(): State {
    return new (class implements State {
      $fractals = signal<Fractal[]>([]);
      $fractal = signal<FractalNull>(null);
      fractal$ = new Subject<FractalNull>();

      constructor(private ss: StateService) {}

      get fractal(): Fractal {
        const result = this.$fractal();
        if (!result) throw new Error('No fractal');
        return result;
      }

      set(fractal: FractalNull, actions?: Partial<FractalActionFields>): State {
        if (fractal) {
          if (actions) {
            Object.entries(actions).forEach(([key, value]) => {
              if (isKeyof<FractalActionFields>(fractal, key)) fractal[key] = value;
            });
          }

          this.$fractals.update(fractals => {
            const set = new Set(fractals);
            set[set.has(fractal) ? 'delete' : 'add'](fractal);
            return Array.from(set);
          });

          fractal.checkName('') &&
            this.ss.router.navigate([], {
              queryParams: {
                [Queries.Rows]: this.$fractals()
                  .map(fractal => fractal.id)
                  .join(':'),
              },
              queryParamsHandling: 'merge',
            });

          fractal.checkType(Pages) &&
            this.ss.router.navigate([fractal.name], {
              queryParams: { [Roots.Manager]: this.ss.manager.fractal?.clicked },
            });

          fractal.checkType(Modifiers) &&
            this.ss.router.navigate([this.ss.page.fractal?.name, fractal.name], {
              queryParamsHandling: 'merge',
            });

          fractal.checkName(Roots.Manager) &&
            this.ss.router.navigate([], {
              queryParams: { [Roots.Manager]: fractal.clicked },
              queryParamsHandling: 'merge',
            });
        } else {
          this.$fractals.set([]);
        }
        this.$fractal.set(fractal);
        this.fractal$.next(fractal);
        return this;
      }
    })(this);
  }
}

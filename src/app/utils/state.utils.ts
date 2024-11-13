import { signal } from '@angular/core';
import { FractalService } from '@services';
import {
  Fractal,
  FractalActions,
  FractalNull,
  Modifiers,
  Pages,
  Queries,
  Roots,
  State,
} from '@types';
import { Subject } from 'rxjs';

export class StateClass implements State {
  $fractals = signal<Fractal[]>([]);
  $fractal = signal<FractalNull>(null);
  fractal$ = new Subject<FractalNull>();

  constructor(private fs: FractalService) {}

  get fractal(): Fractal {
    const result = this.$fractal();
    if (!result) throw new Error('No fractal');
    return result;
  }

  async set(fractal: FractalNull, actions?: Partial<FractalActions>): Promise<State> {
    if (fractal) {
      if (actions) {
        fractal.actions = { ...fractal.actions, ...actions };
      }

      if (fractal.checkCursor('')) {
        this.$fractals.update(fractals => {
          const set = new Set(fractals);
          set[set.has(fractal) ? 'delete' : 'add'](fractal);
          return Array.from(set);
        });
        await this.fs.router.navigate([], {
          queryParams: {
            [Queries.Rows]: this.$fractals()
              .map(fractal => fractal.dto.id)
              .join(':'),
          },
          queryParamsHandling: 'merge',
        });
      }

      if (fractal.checkType(Pages)) {
        const shouldReset = this.fs.modifier.$fractal() || this.fs.row.$fractal();
        if (shouldReset) {
          this.fs.row.set(null);
          this.fs.modifier.set(null);
        }
        await this.fs.router.navigate([fractal.cursor], {
          queryParams: { [Roots.Manager]: this.fs.manager.fractal.actions.clicked },
          queryParamsHandling: shouldReset ? null : 'merge',
        });
      }

      if (fractal.checkType(Modifiers)) {
        await this.fs.router.navigate([], {
          queryParams: { [Roots.Modifiers]: fractal.cursor },
          queryParamsHandling: 'merge',
        });
      }

      if (fractal.checkCursor(Roots.Manager)) {
        await this.fs.router.navigate([], {
          queryParams: { [Roots.Manager]: fractal.actions.clicked },
          queryParamsHandling: 'merge',
        });
      }
    } else {
      this.$fractals.set([]);
    }
    this.$fractal.set(fractal);
    this.fractal$.next(fractal);
    return this;
  }
}

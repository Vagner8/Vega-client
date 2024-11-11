import { signal } from '@angular/core';
import { FractalService } from '@services';
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
import { Subject } from 'rxjs';
import { isKeyof } from './guards.utils';

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

  async set(fractal: FractalNull, actions?: Partial<FractalActionFields>): Promise<State> {
    if (fractal) {
      if (actions) {
        Object.entries(actions).forEach(([key, value]) => {
          if (isKeyof<FractalActionFields>(fractal, key)) fractal[key] = value;
        });
      }

      if (fractal.checkName('')) {
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
        await this.fs.router.navigate([fractal.name], {
          queryParams: { [Roots.Manager]: this.fs.manager.fractal.clicked },
          queryParamsHandling: shouldReset ? null : 'merge',
        });
      }

      if (fractal.checkType(Modifiers)) {
        await this.fs.router.navigate([], {
          queryParams: { [Roots.Modifiers]: fractal.name },
          queryParamsHandling: 'merge',
        });
      }

      if (fractal.checkName(Roots.Manager)) {
        await this.fs.router.navigate([], {
          queryParams: { [Roots.Manager]: fractal.clicked },
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

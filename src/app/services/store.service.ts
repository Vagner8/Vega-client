import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FractalType,
  IFractal,
  Store,
  Pages,
  Queries,
  Roots,
  Act,
  StoreAct,
  StoreActs,
} from '@types';
import { isClick } from '@utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  root = this.create();
  taps = this.create();
  page = this.create();
  items = this.create();
  manager = this.create();
  modifier = this.create();

  constructor(private router: Router) {}

  create(): Store {
    const instance = {
      set: new Set<IFractal>(),
      acts: this.createDefaultActs(),
      signal: signal<FractalType>(null),
      observable$: new Subject<FractalType>(),
      add: (fractal: FractalType, act?: Act) => this.add(fractal, instance, act),
    };
    return instance;
  }

  private add(fractal: FractalType, store: Store, act?: Act): void {
    this.set(fractal, store, act);
    this.navigate(fractal, store);
  }

  private set(fractal: FractalType, store: Store, act?: Act): void {
    if (act) this.setAct(act, store);
    if (fractal) {
      if (store.set.has(fractal)) store.set.delete(fractal);
      else store.set.add(fractal);
    }
    store.signal.set(fractal);
    store.observable$.next(fractal);
  }

  private setAct(act: Act, store: Store) {
    if (isClick(act)) store.acts.click.value = act;
  }

  private createAct(value: Act | null): StoreAct {
    return {
      value,
      is(test: string) {
        return this.value === test;
      },
    };
  }

  private createDefaultActs(): StoreActs {
    return {
      click: this.createAct(null),
    };
  }

  private navigate(fractal: FractalType, store: Store): void {
    fractal?.is(Pages, () =>
      this.router.navigate([fractal.name, ''], {
        queryParams: { [Queries.Items]: null },
        queryParamsHandling: 'merge',
      })
    );
    fractal?.is(Roots.Manager, () => {
      this.router.navigate([], {
        queryParams: { [Queries.Manager]: store.acts.click },
        queryParamsHandling: 'merge',
      });
    });
  }
}

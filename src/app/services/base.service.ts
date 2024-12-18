import { inject, Injectable, signal } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  router = inject(Router);
  $current = signal<IFractal | null>(null);
  private _parent: IFractal | null = null;

  get parent(): IFractal {
    if (!this._parent) throw new Error('Unable to get parent');
    return this._parent;
  }

  set parent(parent: IFractal) {
    this._parent = parent;
  }

  get current(): IFractal {
    const current = this.$current();
    if (!current) throw new Error(`Current is ${current}`);
    return current;
  }

  async navigate(
    queryParams?: Params,
    commands: string[] = [],
    queryParamsHandling: QueryParamsHandling = 'merge'
  ): Promise<void> {
    await this.router.navigate(commands, {
      queryParams,
      queryParamsHandling,
    });
  }
}

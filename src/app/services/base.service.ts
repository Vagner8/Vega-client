import { inject, Injectable, signal } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';
import { ControlDto, IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  router = inject(Router);
  $current = signal<IFractal | null>(null);

  get current(): IFractal {
    const current = this.$current();
    if (!current) throw new Error(`Current is ${current}`);
    return current;
  }

  isFractal(test: object): test is IFractal {
    return Object.hasOwn(test, 'dto');
  }

  isControl(test: object): test is ControlDto {
    return Object.hasOwn(test, 'indicator');
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

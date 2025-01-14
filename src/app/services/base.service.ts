import { inject, Injectable, signal } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  router = inject(Router);
  $fractal = signal<IFractal | null>(null);

  get fractal(): IFractal {
    const fractal = this.$fractal();
    if (!fractal) throw new Error(`Fractal is ${fractal}`);
    return fractal;
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

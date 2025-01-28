import { inject, Injectable, signal } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';
import { Fractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  router = inject(Router);
  $root = signal<Fractal | null>(null);
  collections!: Fractal;

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

import { inject, Injectable, signal } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  router = inject(Router);
  $root = signal<IFractal | null>(null);
  collections!: IFractal;

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

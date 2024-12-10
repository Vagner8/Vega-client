import { inject } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, Router } from '@angular/router';
import { EventService, FractalService, RowsService, SettingsService } from '@services';

export abstract class SuperComponent {
  rs = inject(RowsService);
  es = inject(EventService);
  fs = inject(FractalService);
  ss = inject(SettingsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

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

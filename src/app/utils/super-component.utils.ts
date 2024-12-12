import { inject } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, Router } from '@angular/router';
import { DataService, EventService, FractalService, ListService, SettingsService } from '@services';
import { Types } from '@types';
import { Subscription } from 'rxjs';

export abstract class SuperComponent {
  subscriptions: Subscription[] = [];

  ls = inject(ListService);
  ds = inject(DataService);
  es = inject(EventService);
  fs = inject(FractalService);
  ss = inject(SettingsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  set(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  unsubscribe(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  navigateToTable(cursor: string): void {
    this.ls.clear();
    this.fs.modifier.set(null);
    this.navigate({ [Types.Rows]: null, [Types.Modifier]: null }, [cursor]);
  }
}

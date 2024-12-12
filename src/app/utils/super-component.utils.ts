import { inject } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, Router } from '@angular/router';
import {
  DataService,
  EventService,
  FractalService,
  ListService,
  ManagerService,
  ModifiersService,
  SettingsService,
  TapsService,
} from '@services';
import { Subscription } from 'rxjs';

export abstract class SuperComponent {
  subscriptions: Subscription[] = [];

  ts = inject(TapsService);
  ls = inject(ListService);
  ds = inject(DataService);
  es = inject(EventService);
  fs = inject(FractalService);
  ss = inject(SettingsService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

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
}

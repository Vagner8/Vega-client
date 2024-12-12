import { inject, Injectable } from '@angular/core';
import { Params, QueryParamsHandling, Router } from '@angular/router';
import { TapsService } from './taps.service';
import { ListService } from './list.service';
import { DataService } from './data.service';
import { EventService } from './event.service';
import { FractalService } from './fractal.service';
import { SettingsService } from './settings.service';
import { ModifiersService } from './modifiers.service';
import { ManagerService } from './manager.service';
import { FractalsParams, Modifiers } from '@types';

interface FractalsParams {
  rows: string;
  taps: string;
  manager: string;
  modifier: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  ts = inject(TapsService);
  ls = inject(ListService);
  ds = inject(DataService);
  es = inject(EventService);
  fs = inject(FractalService);
  ss = inject(SettingsService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  router = inject(Router);

  init({ Taps, Modifier }: { Taps: string; Modifier: string }): void {
    this.ts.$taps.set(Taps === FractalsParams.Lists ? this.ls.list : this.ms.modifiers);
    if (Modifiers.Delete === Modifier) this.ls.rowsForm.disable();
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

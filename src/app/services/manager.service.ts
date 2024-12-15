import { inject, Injectable, signal } from '@angular/core';
import { FractalsParams, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  bs = inject(BaseService);

  manager!: IFractal;
  $event = signal('');

  async set(event: string): Promise<void> {
    this.$event.set(event);
    await this.bs.navigate({ [FractalsParams.Manager]: event });
  }

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}

import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';
import { FractalEntities } from '@constants';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  $event = signal('');
  manager!: IFractal;

  async set(event: string): Promise<void> {
    this.$event.set(event);
    await this.navigate({ [FractalEntities.Manager]: event });
  }

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}

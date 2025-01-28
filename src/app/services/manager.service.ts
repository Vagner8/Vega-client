import { Injectable, signal } from '@angular/core';
import { Fractal, FractalEntities } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  $event = signal('');
  manager!: Fractal;

  async set(event: string): Promise<void> {
    this.$event.set(event);
    await this.navigate({ [FractalEntities.Manager]: event });
  }

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}

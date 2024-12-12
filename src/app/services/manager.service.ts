import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  manager!: IFractal;
  $event = signal('');

  init({ Manager }: { Manager: string }): void {
    this.$event.set(Manager);
  }
}

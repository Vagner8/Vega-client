import { Injectable, WritableSignal, signal } from '@angular/core';
import { DrawerTriggers } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _opened = signal<boolean>(false);
  private readonly _trigger = signal<keyof DrawerTriggers>('pages');

  get opened(): WritableSignal<boolean> {
    return this._opened;
  }

  get trigger(): WritableSignal<keyof DrawerTriggers> {
    return this._trigger;
  }

  setOpened(value: boolean): void {
    this._opened.set(value);
  }

  setTrigger(trigger: keyof DrawerTriggers): void {
    this._trigger.set(trigger);
  }
}

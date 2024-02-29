import { Injectable, signal } from '@angular/core';
import { DrawerTriggers } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _opened = signal<boolean>(false);
  private readonly _trigger = signal<keyof DrawerTriggers | null>(null);

  get opened() {
    return this._opened;
  }

  get trigger() {
    return this._trigger;
  }

  setOpened(value: boolean) {
    this._opened.set(value);
  }

  setTrigger(trigger: keyof DrawerTriggers | null) {
    this._trigger.set(trigger);
  }
}

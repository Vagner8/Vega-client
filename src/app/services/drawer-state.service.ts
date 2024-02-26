import { Injectable, WritableSignal, signal } from '@angular/core';
import { DrawerTriggers } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _opened = signal<boolean>(false);
  private readonly _trigger = signal<keyof DrawerTriggers>('pages');

  public get opened(): WritableSignal<boolean> {
    return this._opened;
  }

  public get trigger(): WritableSignal<keyof DrawerTriggers> {
    return this._trigger;
  }

  public setOpened(value: boolean): void {
    this._opened.set(value);
  }

  public setTrigger(trigger: keyof DrawerTriggers): void {
    this._trigger.set(trigger);
  }
}

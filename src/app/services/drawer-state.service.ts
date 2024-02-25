import { Injectable, WritableSignal, signal } from '@angular/core';
import { DrawerType } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _opened = signal<boolean>(false);
  private readonly _trigger = signal<DrawerType.Trigger>('Idle');

  public get opened(): WritableSignal<boolean> {
    return this._opened;
  }

  public get trigger(): WritableSignal<DrawerType.Trigger> {
    return this._trigger;
  }

  public setOpened(value: boolean): void {
    this._opened.set(value);
  }

  public setTrigger(trigger: DrawerType.Trigger): void {
    this._trigger.set(trigger);
  }
}

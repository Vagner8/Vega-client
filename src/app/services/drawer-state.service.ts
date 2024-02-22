import { Injectable, WritableSignal, signal } from '@angular/core';
import { DrawerTypes } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _isOpened = signal<boolean>(false);
  private readonly _trigger = signal<DrawerTypes.Triggers>('Idle');

  public get isOpened(): WritableSignal<boolean> {
    return this._isOpened;
  }

  public get trigger(): WritableSignal<DrawerTypes.Triggers> {
    return this._trigger;
  }
}

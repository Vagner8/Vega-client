import { Injectable, signal } from '@angular/core';
import { CurrentDrawerAction } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _opened = signal<boolean>(false);
  private readonly _currentAction = signal<CurrentDrawerAction>(null);

  get opened() {
    return this._opened;
  }

  get currentAction() {
    return this._currentAction;
  }
}

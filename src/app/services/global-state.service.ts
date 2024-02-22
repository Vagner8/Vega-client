import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private _error = signal<null | string>(null);

  public get error(): WritableSignal<null | string> {
    return this._error;
  }
}

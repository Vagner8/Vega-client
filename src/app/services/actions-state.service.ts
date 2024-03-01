import { Injectable, signal } from '@angular/core';

interface Action {
  disabled: boolean;
}

interface OkAction extends Action {}

interface EditAction extends Action {}

@Injectable({
  providedIn: 'root',
})
export class ActionsStateService {
  private readonly _send = signal<OkAction>({ disabled: true });
  private readonly _edit = signal<EditAction>({ disabled: true });

  get send() {
    return this._send;
  }

  get edit() {
    return this._edit;
  }
}

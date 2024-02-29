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

  setOk(value: Partial<OkAction>) {
    this._send.update((prev) => ({ ...prev, ...value }));
  }

  get edit() {
    return this._edit;
  }

  setEdit(value: Partial<EditAction>) {
    this._edit.update((prev) => ({ ...prev, ...value }));
  }
}

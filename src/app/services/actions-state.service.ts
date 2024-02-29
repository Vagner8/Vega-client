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
  private readonly _ok = signal<OkAction>({ disabled: true });
  private readonly _edit = signal<EditAction>({ disabled: true });

  get ok() {
    return this._ok;
  }

  setOk(value: Partial<OkAction>) {
    this._ok.update((prev) => ({ ...prev, ...value }));
  }

  get edit() {
    return this._edit;
  }

  setEdit(value: Partial<EditAction>) {
    this._edit.update((prev) => ({ ...prev, ...value }));
  }
}

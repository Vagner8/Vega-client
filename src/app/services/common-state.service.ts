import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonStateService {
  private readonly _error = signal<string>('');
  private readonly _login = signal<boolean>(false);

  public get error(): WritableSignal<string | null> {
    return this._error;
  }

  public get login(): WritableSignal<boolean> {
    return this._login;
  }

  public setError(error: string): void {
    this._error.set(error);
  }

  public setLogin(login: boolean): void {
    this._login.set(login);
  }
}

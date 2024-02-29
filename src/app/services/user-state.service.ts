import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private readonly _user = signal<User | null>(null);
  private readonly _login = signal<boolean>(false);
  private readonly _token = signal<string>('');

  get login(): WritableSignal<boolean> {
    return this._login;
  }

  setLogin(login: boolean): void {
    this._login.set(login);
  }

  get user(): WritableSignal<User | null> {
    return this._user;
  }

  setUser(value: Partial<User>): void {
    this._user.update((user) => {
      if (!user) return null;
      return {
        ...user,
        ...value,
      };
    });
  }
}

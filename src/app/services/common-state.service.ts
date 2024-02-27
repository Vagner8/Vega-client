import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonStateService {
  private readonly _error = signal<string>('');

  public get error(): WritableSignal<string | null> {
    return this._error;
  }

  public setError(error: string): void {
    this._error.set(error);
  }
}

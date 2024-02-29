import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonStateService {
  private readonly _error = signal<string>('');
  private readonly _url = signal<string>('');

  get error() {
    return this._error;
  }

  setError(error: string) {
    this._error.set(error);
  }

  get url() {
    return this._url;
  }

  setUrl(url: string) {
    this._url.set(url);
  }
}

import { Injectable, signal } from '@angular/core';
import { Exception } from '@types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly page = signal<string>('');
  readonly error = signal<Exception | null>(null);
  readonly executer = signal<string>('');
  readonly isFetching = signal<boolean>(false);
  readonly sidenav = signal<boolean>(false);
}

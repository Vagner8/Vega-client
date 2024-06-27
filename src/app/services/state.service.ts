import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly page = signal<string>('');
  readonly error = signal<string | null>(null);
  readonly active = signal<string>('');
  readonly isFetching = signal<boolean>(false);
  readonly drawerOpened = signal<boolean>(false);
}

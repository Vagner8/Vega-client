import { Injectable, signal } from '@angular/core';
import { Exception, SidenavState, TapConfig } from '@types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly taps = signal<TapConfig[]>([]);

  readonly page = signal<string>('');
  readonly executer = signal<string>('');

  readonly error = signal<Exception | null>(null);
  readonly sidenav = signal<SidenavState>('close');
  readonly isFetching = signal<boolean>(false);
}

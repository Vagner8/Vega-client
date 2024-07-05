import { Injectable, signal } from '@angular/core';
import { Exception, SidenavState } from '@types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly page = signal<string>('');
  readonly error = signal<Exception | null>(null);
  readonly sidenav = signal<SidenavState>('close');
  readonly executer = signal<string>('');
  readonly isFetching = signal<boolean>(false);
}

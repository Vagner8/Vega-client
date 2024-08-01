import { Injectable, signal } from '@angular/core';
import { Exception, SidenavState } from '@types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  error = signal<Exception | null>(null);
  sidenav = signal<SidenavState>('Close');
  isFetching = signal<boolean>(false);
}

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly error = signal<string | null>(null);
  readonly drawerOpened = signal<boolean>(false);
}

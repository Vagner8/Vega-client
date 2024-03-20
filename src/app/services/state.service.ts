import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public readonly drawerOpened = signal<boolean>(false);
  public readonly error = signal<string | null>(null);
}

import { Injectable, signal } from '@angular/core';

export type DrawerTriggers = 'actions' | 'pages' | 'settings' | 'idle';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  public error = signal<null | string>(null);

  public drawerOpened = signal<boolean>(false);
  public drawerTrigger = signal<DrawerTriggers>('idle');
}

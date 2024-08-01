import { Injectable, signal } from '@angular/core';
import { ClickInfo, TapConfig, TapsNames, TapsSidenavs } from '@types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  active = signal<TapsNames | null>(null);

  taps = signal<TapConfig[]>([]);
  clicked = signal<ClickInfo | null>(null);
  clicked$ = new Subject<ClickInfo>();

  private Fractals: TapConfig[] = [
    {
      name: 'Home',
      icon: 'home',
      type: 'Fractals',
    },
  ];
  private Actions: TapConfig[] = [
    {
      name: 'Delete',
      icon: 'delete',
      type: 'Actions',
    },
    {
      name: 'Save',
      icon: 'save',
      type: 'Actions',
    },
    {
      name: 'Add',
      icon: 'add_circle',
      type: 'Actions',
    },
  ];
  private Settings: TapConfig[] = [
    {
      name: 'Settings',
      icon: 'settings',
      type: 'Settings',
    },
  ];

  addFractals(config: TapConfig): void {
    this.Fractals.unshift(config);
  }

  set(type: TapsSidenavs | null): void {
    if (!type) this.taps.set([]);
    else this.taps.set(this[type]);
  }
}

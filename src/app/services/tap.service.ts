import { Injectable, signal } from '@angular/core';
import { FractalDto, TapConfig, TapLocation, TapNames } from '@types';
import { ControlService } from './control.service';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  taps = signal<TapConfig[]>([]);
  location = signal<TapLocation | null>(null);
  activated = signal<TapNames | null>(null);

  private Pages: TapConfig[] = [
    {
      name: 'Home',
      icon: 'home',
      navigation: true,
    },
  ];
  private Actions: TapConfig[] = [
    {
      name: 'Delete',
      icon: 'delete',
    },
    {
      name: 'Save',
      icon: 'save',
    },
    {
      name: 'Add',
      icon: 'add_circle',
    },
  ];
  private Settings: TapConfig[] = [
    {
      name: 'Settings',
      icon: 'settings',
    },
  ];

  constructor(private cs: ControlService) {}

  addPages({ fractals }: FractalDto): void {
    for (const fractalName in fractals) {
      const controls = fractals[fractalName].controls;
      const icon = this.cs.icon(controls);
      const name = this.cs.pageName(controls);
      this.Pages = [{ name, icon, navigation: true }, ...this.Pages];
    }
  }

  setView(location: TapLocation) {
    this.location.set(location);
    this.taps.set(this[location]);
  }
}

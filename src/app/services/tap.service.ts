import { Injectable, signal } from '@angular/core';
import { FractalDto, TapConfig, TapLocation } from '@types';
import { ControlService } from './control.service';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  view = signal<TapConfig[]>([]);

  private Pages: TapConfig[] = [
    {
      name: 'Home',
      icon: 'home',
      navigation: true,
    },
  ];
  private Actions: TapConfig[] = [
    {
      name: 'Send',
      icon: 'send',
    },
    {
      name: 'Update',
      icon: 'edit',
    },
    {
      name: 'Remove',
      icon: 'delete',
    },
    {
      name: 'Confirm',
      icon: 'task_alt',
    },
    {
      name: 'Cancel',
      icon: 'cancel',
    },
    {
      name: 'Add',
      icon: 'add',
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
    this.view.set(this[location]);
  }
}

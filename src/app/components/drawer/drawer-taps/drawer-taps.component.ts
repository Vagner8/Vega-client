import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { TapService } from '@services';
import { TapActive } from '@types';

@Component({
  selector: 'app-drawer-taps',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, MatButton],
  templateUrl: './drawer-taps.component.html',
  styleUrl: './drawer-taps.component.css',
})
export class DrawerTapsComponent {
  constructor(private ts: TapService) {}

  get active$() {
    return this.ts.active$;
  }

  onClick(tap: TapActive): void {
    this.activateActiveToolbars();
    tap.onClick();
  }

  private activateActiveToolbars() {
    this.ts.toolbars.forEach((t) => t.state.disabled.set(false));
  }
}

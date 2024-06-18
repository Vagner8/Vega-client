import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { TapService } from '@services';
import { TapActive } from '@types';

@Component({
  selector: 'app-drawer-taps',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './drawer-taps.component.html',
  styleUrl: './drawer-taps.component.css',
})
export class DrawerTapsComponent {
  constructor(private ts: TapService) {}

  get taps() {
    return this.ts.performers[this.ts.rec.toolbar()!];
  }

  onClick(tap: TapActive): void {
    this._activateActionTaps();
    tap.onClick();
  }

  private _activateActionTaps() {
    this.ts.toolbars.forEach((t) => t.state.disabled.set(false));
  }
}

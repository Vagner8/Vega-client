import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { TapService } from '@services';
import { ITap } from '@types';

@Component({
  selector: 'app-drawer-taps',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './drawer-taps.component.html',
  styleUrl: './drawer-taps.component.css',
})
export class DrawerTapsComponent {
  constructor(private tap: TapService) {}

  get taps() {
    return this.tap.modifiers[this.tap.rec.toolbar()!].arr;
  }

  onClick(tap: ITap): void {
    tap.onClick();
  }
}

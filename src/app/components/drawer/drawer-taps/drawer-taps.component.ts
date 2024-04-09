import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import { TapService } from '@services';
import { RouteParam, Tap, TapPlace } from '@types';

@Component({
  selector: 'app-drawer-taps',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './drawer-taps.component.html',
  styleUrl: './drawer-taps.component.css',
})
export class DrawerTapsComponent {
  First: string = '';

  constructor(private tap: TapService, private router: Router) {}

  get taps(): Tap[] {
    return this.tap.getTaps(this.tap.getRec(TapPlace.Toolbar));
  }

  onClick(tap: Tap): void {
    if (!tap.options?.navigation) return;
    if (tap.place === TapPlace.Pages) {
      this.First = tap.name;
      this.router.navigate([tap.name]);
    } else {
      this.router.navigate([this.First, { [RouteParam.Second]: tap.name }]);
    }
  }
}

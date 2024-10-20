import { Component } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { StateService } from '@services';
import { Fractal, Modifiers, Pages } from '@types';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.css',
})
export class SidenavTapsComponent {
  constructor(public ss: StateService) {}

  disabled(tap: Fractal): boolean {
    switch (tap.name) {
      case Modifiers.Delete:
      case Modifiers.Edit:
        return this.ss.clickedRows.size === 0;
      default:
        return false;
    }
  }

  onClick(tap: Fractal): void {
    tap
      .is(Pages)
      .yes(() => {
        this.ss.pageTap.set(tap);
        this.ss.modifierTap.set(null);
      })
      .no(() => this.ss.modifierTap.set(tap));
  }
}

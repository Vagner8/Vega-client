import { Component } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { StateService } from '@services';
import { Fractal, Modifiers, Pages } from '@types';

@Component({
  selector: 'app-sidenavs',
  standalone: true,
  imports: [TapComponent, MatListModule],
  templateUrl: './sidenavs.component.html',
  styleUrl: './sidenavs.component.css',
})
export class SidenavsComponent {
  constructor(public ss: StateService) {}

  disabled(tap: Fractal): boolean {
    const { length } = this.ss.row.$fractals();
    const fractals = this.ss.row.$fractals();
    switch (tap.name) {
      case Modifiers.Save:
        return fractals[0] ? !fractals[0].formGroup.dirty : true;
      case Modifiers.Delete:
        return length === 0;
      case Modifiers.Edit:
        return length !== 1;
      default:
        return false;
    }
  }

  onClick(tap: Fractal): void {
    tap
      .check(Pages)
      .yes(() => {
        this.ss.page.set(tap);
        this.ss.row.set(null);
        this.ss.modifier.set(null);
      })
      .no(() => this.ss.modifier.set(tap));
  }
}

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
    const fractals = this.ss.row.$fractals();
    switch (tap.name) {
      case Modifiers.Save:
        return fractals[0] ? !fractals[0].formGroup.dirty : true;
      case Modifiers.Delete:
        return fractals.length === 0;
      case Modifiers.Edit:
        return fractals.length !== 1;
      default:
        return false;
    }
  }

  async onClick(tap: Fractal): Promise<void> {
    if (tap.checkType(Pages)) {
      await this.ss.page.set(tap);
      await this.ss.row.set(null);
      this.ss.modifier.set(null);
    } else {
      await this.ss.modifier.set(tap);
      if (tap.checkName(Modifiers.New)) {
        const { fractal } = this.ss.page;
        this.ss.row.set(null);
        this.ss.row.set(fractal.clone());
      }
    }
  }

  onHold(tap: Fractal): void {
    if (tap.checkName(Modifiers.Save)) {
      this.ss.update();
    }
    if (tap.checkName(Modifiers.Delete)) {
      this.ss.delete();
    }
  }
}

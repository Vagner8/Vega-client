import { Component } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { DataService, StateService } from '@services';
import { Fractal, Modifiers, Pages } from '@types';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.css',
})
export class SidenavTapsComponent {
  constructor(
    public ss: StateService,
    private ds: DataService
  ) {}

  isSet(fractal: Fractal): boolean {
    return (
      fractal.checkName(Modifiers.Save) && !!this.ss.modifier.$fractal()?.checkName(Modifiers.Save)
    );
  }

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

  onClick(tap: Fractal): void {
    if (tap.checkType(Pages)) {
      this.ss.page.set(tap);
      this.ss.row.set(null);
      this.ss.modifier.set(null);
    } else {
      this.ss.modifier.set(tap);
    }
  }

  onHoldClick(tap: Fractal): void {
    this.ss.row.fractal.update();
    console.log('🚀 ~ this.ss.row.fractal:', tap);
  }
}

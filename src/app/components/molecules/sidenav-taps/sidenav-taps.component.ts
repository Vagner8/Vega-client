import { Component } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { FractalService } from '@services';
import { Fractal, Modifiers, Pages } from '@types';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.css',
})
export class SidenavTapsComponent {
  constructor(public fs: FractalService) {}

  disabled(tap: Fractal): boolean {
    const fractals = this.fs.row.$fractals();
    switch (tap.cursor) {
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
      await this.fs.page.set(tap);
      await this.fs.row.set(null);
      this.fs.modifier.set(null);
    } else {
      await this.fs.modifier.set(tap);
      if (tap.checkCursor(Modifiers.New)) {
        this.fs.row.set(null);
        this.fs.row.set(this.fs.clone());
      }
    }
  }

  onHold(tap: Fractal): void {
    if (tap.checkCursor(Modifiers.Save)) {
      this.fs.update();
    }
    if (tap.checkCursor(Modifiers.Delete)) {
      this.fs.delete();
    }
  }
}

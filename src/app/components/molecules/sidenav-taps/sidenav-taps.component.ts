import { Component } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { FractalService } from '@services';
import { IFractal, Modifiers, Pages } from '@types';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.css',
})
export class SidenavTapsComponent {
  constructor(public fs: FractalService) {}

  disabled(cursor: string): boolean {
    const rows = this.fs.rows.signal();
    const isNew = this.fs.modifier.is(Modifiers.New);
    const hasRows = rows.length > 0;

    switch (cursor) {
      case Modifiers.Edit:
        return isNew || !hasRows;
      case Modifiers.Save:
        return rows.length ? !rows.some(({ formGroup }) => formGroup.data.dirty) : true;
      case Modifiers.Delete:
        return isNew || !hasRows;
      default:
        return false;
    }
  }

  async onClick(tap: IFractal): Promise<void> {
    const isPages = tap.is(Pages);
    if (isPages) {
      this.fs.reset(tap);
    } else {
      await this.fs.modifier.set(tap);
      if (tap.is(Modifiers.New)) this.fs.rows.set(this.fs.clone());
    }
  }

  onHold(tap: IFractal): void {
    if (tap.is(Modifiers.Save)) {
      this.fs.update();
    }
    if (tap.is(Modifiers.Delete)) {
      this.fs.delete();
    }
  }
}

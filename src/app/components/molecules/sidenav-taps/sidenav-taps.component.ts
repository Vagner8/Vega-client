import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavTapsComponent {
  constructor(public fs: FractalService) {}

  async touch(tap: IFractal): Promise<void> {
    if (tap.is(Pages)) {
      this.fs.reset(tap);
    } else {
      await this.fs.modifier.set(tap);
      if (tap.is(Modifiers.New)) this.fs.rows.set(this.fs.clone());
      if (tap.is(Modifiers.Save)) {
        this.fs.rows.filter(row => row.formGroup.dirty);
        this.fs.disableFormGroups$.next(true);
        return;
      }
      if (tap.is(Modifiers.Delete)) {
        this.fs.rows.filter(row => !row.isClone);
        this.fs.disableFormGroups$.next(true);
        return;
      }
    }
    this.fs.disableFormGroups$.next(false);
  }

  hold(tap: IFractal): void {
    if (tap.is(Modifiers.Save)) {
      this.fs.update();
    }
    if (tap.is(Modifiers.Delete)) {
      this.fs.delete();
    }
  }
}

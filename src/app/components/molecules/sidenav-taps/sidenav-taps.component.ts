import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { IFractal, Modifiers, Pages } from '@types';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { SuperComponent } from '@utils';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule, CdkDropList, CdkDrag, NgClass],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavTapsComponent extends SuperComponent {
  async touch(tap: IFractal): Promise<void> {
    if (tap.is(Pages)) {
      this.fs.reset(tap);
    } else {
      await this.fs.modifier.set(tap);
      if (tap.is(Modifiers.New)) this.fs.rows.set(this.fs.clone());
      if (tap.is(Modifiers.Save)) {
        this.fs.rows.filter(row => row.formGroup.dirty);
        this.es.disableFormGroups$.next(true);
        return;
      }
      if (tap.is(Modifiers.Delete)) {
        this.fs.rows.filter(row => !row.isClone);
        this.es.disableFormGroups$.next(true);
        return;
      }
    }
    this.es.disableFormGroups$.next(false);
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

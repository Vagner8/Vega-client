import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { MatListModule } from '@mat';
import { DataService, FractalService } from '@services';
import { IFractal, Indicators, Modifiers, Pages } from '@types';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sidenav-taps',
  standalone: true,
  imports: [TapComponent, MatListModule, CdkDropList, CdkDrag],
  templateUrl: './sidenav-taps.component.html',
  styleUrl: './sidenav-taps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavTapsComponent {
  constructor(
    public fs: FractalService,
    private ds: DataService
  ) {}

  drop(event: CdkDragDrop<string[]>): void {
    const taps = this.fs.taps.signal();
    if (!taps) return;
    const sort = taps.sort();
    moveItemInArray(sort, event.previousIndex, event.currentIndex);
    taps.dto.controls[Indicators.Sort].data = sort.join(':');
    const { id, parentId, controls } = taps.dto;
    this.ds.edit([{ id, parentId, fractals: null, controls }]).subscribe();
  }

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

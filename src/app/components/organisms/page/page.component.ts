import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ListComponent } from '@components/atoms';
import { ModifierComponent } from '../modifier/modifier.component';
import { SuperComponent } from '@utils';
import { Events, IFractal, Types } from '@types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [ListComponent, ModifierComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends SuperComponent implements OnInit {
  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Lists = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(): void {
    console.log('🚀 ~ Pages:', this.Lists);
  }

  async rowTouched(row: IFractal): Promise<void> {
    await this.ls.add(row);
    if (this.fs.managerEvent() !== Events.Touch) {
      this.fs.managerEvent.set(Events.Touch);
      await this.navigate({ [Types.Manager]: Events.Touch });
    }
    if (this.fs.taps()?.is(Types.Lists)) {
      this.fs.taps.set(this.fs.modifiers);
      await this.navigate({ [Types.Taps]: Types.Modifiers });
    }
  }

  columnChanged(event: CdkDragDrop<string[]>): void {
    moveItemInArray([], event.previousIndex, event.currentIndex);
  }

  private init(): void {
    const list = this.fs.pages.find(this.Lists);
    this.fs.taps.set(this.Taps === Types.Lists ? this.fs.pages : this.fs.modifiers);
    this.fs.list.set(list);
    this.ls.init({ rowsIds: this.Rows, modifier: this.Modifier, list });
    this.fs.modifier.set(this.Modifier ? this.fs.modifiers.find(this.Modifier) : null);
    this.fs.managerEvent.set(this.Manager);
  }
}

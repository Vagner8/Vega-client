import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ListComponent } from '@components/atoms';
import { ModifierComponent } from '../modifier/modifier.component';
import { Events, Fractals, FractalsParams, IFractal } from '@types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BaseService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [ListComponent, ModifierComponent, AsyncPipe],
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  bs = inject(BaseService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Lists = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  modifyColumns$ = this.bs.ls.columnsForm.valueChanges.pipe(
    map(() => this.bs.ls.columnsForm.controls.length > 0)
  );

  ngOnInit(): void {
    this.init();
  }

  async rowTouched(row: IFractal): Promise<void> {
    await this.bs.ls.addRow(row);
    if (this.bs.mgr.$event() !== Events.Touch) {
      this.bs.mgr.$event.set(Events.Touch);
      await this.bs.navigate({ [FractalsParams.Manager]: Events.Touch });
    }
    if (this.bs.ts.$taps()?.is(Fractals.Lists)) {
      this.bs.ts.$taps.set(this.bs.ms.modifiers);
      await this.bs.navigate({ [FractalsParams.Taps]: Fractals.Modifiers });
    }
  }

  columnsChanged(event: CdkDragDrop<string[]>): void {
    const columns = this.bs.ls.$columns[this.Lists]();
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    this.bs.ls.$columns[this.Lists].set(columns);
  }

  private init(): void {
    const { Rows, Taps, Lists, Manager, Modifier } = this;
    this.bs.ls.init({ Rows, Lists });
    this.bs.ms.init({ Modifier });
    this.bs.mgr.init({ Manager });
    this.bs.init({ Taps, Modifier });
  }
}

import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ListComponent } from '@components/atoms';
import { Events, Fractals, FractalsParams, IFractal, Modifiers } from '@types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs';
import {
  BaseService,
  FractalService,
  ListService,
  ManagerService,
  ModifiersService,
  TapsService,
} from '@services';
import { AppModifierComponent } from '../app-modifier/app-modifier.component';
import { RowsModifierComponent } from '../rows-modifier/rows-modifier.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [ListComponent, AppModifierComponent, RowsModifierComponent],
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  ts = inject(TapsService);
  ls = inject(ListService);
  bs = inject(BaseService);
  fs = inject(FractalService);
  ms = inject(ModifiersService);
  mgr = inject(ManagerService);

  @Input() Taps = '';
  @Input() Rows = '';
  @Input() Lists = '';
  @Input() Manager = '';
  @Input() Modifier = '';

  modifyColumns$ = this.ls.columnsForm.valueChanges.pipe(
    map(() => this.ls.columnsForm.controls.length > 0)
  );

  ngOnInit(): void {
    this.init();
  }

  async rowTouched(row: IFractal): Promise<void> {
    await this.ls.addRow(row);
    if (this.mgr.$event() !== Events.Touch) {
      this.mgr.$event.set(Events.Touch);
      await this.bs.navigate({ [FractalsParams.Manager]: Events.Touch });
    }
    if (this.ts.$taps()?.is(Fractals.Lists)) {
      this.ts.$taps.set(this.ms.modifiers);
      await this.bs.navigate({ [FractalsParams.Taps]: Fractals.Modifiers });
    }
  }

  columnsChanged(event: CdkDragDrop<string[]>): void {
    const columns = this.ls.$columns[this.Lists]();
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    this.ls.$columns[this.Lists].set(columns);
  }

  private init(): void {
    const { Rows, Taps, Lists, Manager, Modifier } = this;
    this.ls.init({ Rows, Lists });
    this.ms.init({ Modifier });
    this.mgr.init({ Manager });
    this.ts.$taps.set(Taps === FractalsParams.Lists ? this.ls.lists : this.ms.modifiers);
    if (Modifiers.Delete === Modifier) this.ls.rowsForm.disable();
  }
}

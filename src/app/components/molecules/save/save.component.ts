import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '../../atoms/tap/tap.component';
import { FractalDto, FractalStatus, IFractal } from '@types';
import { DataService, ListService, ModifiersService, RowsService } from '@services';

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './save.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveComponent {
  rs = inject(RowsService);
  ds = inject(DataService);
  ls = inject(ListService);
  ms = inject(ModifiersService);
  @Input() tap!: IFractal;
  @Input() set newTapTouched(value: boolean) {
    this.disabled = this.disabled && !value;
  }
  @Input() set isRowsFormDirty(value: boolean) {
    this.disabled = this.disabled && !value;
  }
  touch = output<IFractal>();
  disabled = true;

  async saveHeld(): Promise<void> {
    const toAdd: FractalDto[] = [];
    const toUpdate: FractalDto[] = [];

    for (const row of this.rs.$rows()) {
      if (row.status === FractalStatus.New) {
        row.status = FractalStatus.Stable;
        toAdd.push(row.update());
        continue;
      }
      if (row.formGroup.dirty) toUpdate.push(row.update());
    }
    toAdd.length > 0 && this.ds.add(toAdd).subscribe();
    toUpdate.length > 0 && this.ds.update(toUpdate).subscribe();
    await this.ms.set(null);
    this.ls.set(this.ls.list);
    this.rs.set(null);
  }

  saveTouched(tap: IFractal): void {
    this.ls.list.formArray.disable();
    this.touch.emit(tap);
  }
}

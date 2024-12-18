import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '../../atoms/tap/tap.component';
import { FractalDto, FractalStatus, IFractal } from '@types';
import { DataService, CollectionsService, ModifiersService, RowsService } from '@services';

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
  cs = inject(CollectionsService);
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
    this.disabled = true;
    const toAdd: FractalDto[] = [];
    const toUpdate: FractalDto[] = [];

    for (const row of this.rs.$currents()) {
      if (row.status === FractalStatus.New) {
        row.status = FractalStatus.Stable;
        const updated = row.update();
        toAdd.push(updated.dto);
        this.cs.current.addChild(updated);
        continue;
      }
      if (row.formRecord.dirty) toUpdate.push(row.update().dto);
    }
    toAdd.length > 0 && this.ds.add(toAdd).subscribe();
    toUpdate.length > 0 && this.ds.update(toUpdate).subscribe();
    await this.ms.set(null);
    await this.rs.set(null);
    this.cs.set(this.cs.current);
  }

  saveTouched(tap: IFractal): void {
    this.cs.current.formArray.disable();
    this.touch.emit(tap);
  }
}

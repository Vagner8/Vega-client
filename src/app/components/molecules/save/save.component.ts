import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { TapComponent } from '../../atoms/tap/tap.component';
import { FractalDto, FractalStatus, IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './save.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveComponent extends SuperComponent {
  @Input() tap!: IFractal;
  @Input() set newTapTouched(value: boolean) {
    this.disabled = this.disabled && !value;
  }
  @Input() set isRowsFormDirty(value: boolean) {
    this.disabled = this.disabled && !value;
  }
  touch = output<IFractal>();
  disabled = true;

  saveHeld(): void {
    const toAdd: FractalDto[] = [];
    const toUpdate: FractalDto[] = [];

    for (const row of this.ls.$rows()) {
      if (row.status === FractalStatus.New) {
        toAdd.push(row.update());
        continue;
      }
      if (row.formGroup.dirty) toUpdate.push(row.update());
    }

    toAdd.length > 0 && this.ds.add(toAdd).subscribe();
    toUpdate.length > 0 && this.ds.update(toUpdate).subscribe();
    this.ls.set(this.ls.list);
  }

  saveTouched(tap: IFractal): void {
    this.ls.rowsForm.disable();
    this.touch.emit(tap);
  }
}

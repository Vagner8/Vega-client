import { Component, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { FractalDto, FractalStatus, IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './delete.component.html',
})
export class DeleteComponent extends SuperComponent {
  @Input() tap!: IFractal;
  touch = output<IFractal>();

  deleteHeld(): void {
    const toDelete: FractalDto[] = [];
    for (const row of this.ls.$rows()) {
      delete row.parent.fractals![row.cursor];
      if (row.status !== FractalStatus.New) toDelete.push(row.update());
    }
    toDelete.length > 0 && this.ds.delete(toDelete).subscribe();
    this.ls.set(this.ls.list);
  }

  deleteTouched(tap: IFractal): void {
    this.ls.form.disable();
    this.touch.emit(tap);
  }
}

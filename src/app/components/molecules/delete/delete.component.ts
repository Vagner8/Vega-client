import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { DataService, ListService, ModifiersService, RowsService } from '@services';
import { FractalDto, FractalStatus, IFractal } from '@types';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  ls = inject(ListService);
  rs = inject(RowsService);
  ds = inject(DataService);
  ms = inject(ModifiersService);

  @Input() tap!: IFractal;
  touch = output<IFractal>();

  async deleteHeld(): Promise<void> {
    const toDelete: FractalDto[] = [];
    const rows = this.rs.$rows();
    for (let i = 0; i <= this.ls.list.list().length; i++) {
      if (!this.ls.list.fractals) return;
      if (rows.includes(this.ls.list.fractals[i])) {
        delete this.ls.list.fractals[i];
        if (this.rs.$rows()[i].status !== FractalStatus.New) toDelete.push(this.rs.$rows()[i].dto);
      }
    }
    for (const row of this.rs.$rows()) {
      delete row.parent.fractals![row.cursor];
      if (row.status !== FractalStatus.New) toDelete.push(row.update());
    }
    toDelete.length > 0 && this.ds.delete(toDelete).subscribe();
    await this.ms.set(null);
    await this.ls.set(this.ls.list);
  }

  deleteTouched(tap: IFractal): void {
    this.ls.list.formArray.disable();
    this.touch.emit(tap);
  }
}

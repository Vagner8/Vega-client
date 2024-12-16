import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { DataService, ListService, ModifiersService, RowsService } from '@services';
import { FractalDto, FractalStatus, IFractal, IFractals, Indicators } from '@types';

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
    let newPosition = 1;
    const toDelete: FractalDto[] = [];
    const toUpdate: FractalDto[] = [];
    const updatedFractals: IFractals = {};
    for (const position in this.ls.list.fractals) {
      const fractal = this.ls.list.fractals[position];
      if (!this.rs.rows.includes(fractal)) {
        const position = `${newPosition++}`;
        fractal.dto.controls[Indicators.Position].data = position;
        fractal.getFormControl(Indicators.Position)?.setValue(position);
        updatedFractals[newPosition - 1] = fractal;
        fractal.status !== FractalStatus.New && toUpdate.push(fractal.dto);
      } else {
        fractal.status !== FractalStatus.New && toDelete.push(fractal.dto);
      }
    }
    this.ls.list.fractals = updatedFractals;
    toDelete.length > 0 && this.ds.delete(toDelete).subscribe();
    toUpdate.length > 0 && this.ds.update(toUpdate).subscribe();
    await this.ms.set(null);
    await this.rs.set(null);
    this.ls.set(this.ls.list);
  }

  deleteTouched(tap: IFractal): void {
    this.ls.list.formArray.disable();
    this.touch.emit(tap);
  }
}

import { Component, inject, Input, output } from '@angular/core';
import { TapComponent } from '@components/atoms';
import { DataService, CollectionsService, ModifiersService, RowsService } from '@services';
import { FractalDto, FractalStatus, IFractal, IFractals, Indicators } from '@types';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [TapComponent],
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  cs = inject(CollectionsService);
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
    for (const position in this.cs.current.fractals) {
      const fractal = this.cs.current.fractals[position];
      if (!this.rs.$currents().includes(fractal)) {
        const position = `${newPosition++}`;
        fractal.dto.controls[Indicators.Position].data = position;
        fractal.getFormControl(Indicators.Position)?.setValue(position);
        updatedFractals[newPosition - 1] = fractal;
        fractal.status !== FractalStatus.New && toUpdate.push(fractal.dto);
      } else {
        fractal.status !== FractalStatus.New && toDelete.push(fractal.dto);
      }
    }
    this.cs.current.fractals = updatedFractals;
    toDelete.length > 0 && this.ds.delete(toDelete).subscribe();
    toUpdate.length > 0 && this.ds.update(toUpdate).subscribe();
    await this.ms.set(null);
    await this.rs.set(null);
    this.cs.set(this.cs.current);
  }

  deleteTouched(tap: IFractal): void {
    this.cs.current.formArray.disable();
    this.touch.emit(tap);
  }
}

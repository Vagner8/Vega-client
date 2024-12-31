import { Component, Input, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { UpdateService } from '@services';
import { ControlDto, IFractal } from '@types';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  us = inject(UpdateService);
  @Input() like: 'fractals' | 'controls' = 'fractals';
  @Input() rows: IFractal[] = [];
  @Input() fractal!: IFractal;
  hold = output<IFractal>();
  touch = output<IFractal>();

  get columns(): string[] {
    return this.like === 'controls' ? ['indicator', 'data'] : this.fractal.array('Columns');
  }

  get dataSource(): unknown[] {
    return this.like === 'controls' ? this.fractal.controlsArray : this.fractal.fractalsArray;
  }

  onHold(row: IFractal): void {
    if (this.like === 'controls') this.us.set([row]);
    else this.us.set(this.us.$currents().length > 0 ? null : row.parent?.fractalsArray);
  }

  onTouch(row: IFractal): void {
    this.us.set([row]);
    this.touch.emit(row);
  }

  clickedRow(row: IFractal | ControlDto): boolean {
    if ('dto' in row) return this.rows.includes(row);
    else return this.rows.includes(this.fractal) && this.fractal.dto.id === row.parentId;
  }
}

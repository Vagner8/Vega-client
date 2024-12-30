import { Component, Input, ChangeDetectionStrategy, output, inject, OnInit } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { UpdateService } from '@services';
import { Collections, ControlDto, IFractal } from '@types';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent implements OnInit {
  us = inject(UpdateService);
  @Input() rows: IFractal[] = [];
  @Input() fractal!: IFractal;
  hold = output<IFractal>();
  touch = output<IFractal>();
  isFractalCollection = false;

  ngOnInit(): void {
    this.isFractalCollection = this.fractal.is(Collections) && this.fractal.fractals !== null;
  }

  get columns(): string[] {
    return this.isFractalCollection ? this.fractal.columns : ['indicator', 'data'];
  }

  get dataSource(): unknown[] {
    return this.isFractalCollection ? this.fractal.list : this.fractal.controlsList;
  }

  onHold(row: IFractal): void {
    if (this.isFractalCollection) this.us.$currents.set(this.us.$currents().length > 0 ? [] : row.parent?.list || []);
    else this.us.set(row);
  }

  onTouch(row: IFractal): void {
    this.us.set(row);
    this.touch.emit(row);
  }

  rowIsClicked(row: IFractal | ControlDto): boolean {
    if ('dto' in row) return this.rows.includes(row);
    else return this.rows.includes(this.fractal) && this.fractal.dto.id === row.parentId;
  }
}

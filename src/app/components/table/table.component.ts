import { Component } from '@angular/core';
import { MatTableModule } from '@mat';
import { ControlService, MatrixService, NavService } from '@services';
import { ControlName, Unit } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  displayedColumns!: string[];

  constructor(
    private nav: NavService,
    private matrix: MatrixService,
    private control: ControlService
  ) {}

  get address() {
    return this.nav.address;
  }

  hasMatrices() {
    return Boolean(this.matrix.data.size);
  }

  cell(displayedColumn: string, unit: Unit) {
    return unit.controls.find((c) => c.name.value === displayedColumn)?.data
      .value;
  }

  lines(page: string) {
    const matrix = this.matrix.data.get(page);
    if (!matrix) return [];
    this.displayedColumns =
      this.control.find("Sort", matrix.controls)?.data.value?.split(':') || [];
    return matrix.units;
  }
}

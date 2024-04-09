import { Component, Signal } from '@angular/core';
import { MatTableModule } from '@mat';
import { MatrixService } from '@services';
import { ControlDto } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  // @Input() controls: ControlDto[] | null = [];
  displayedColumns = ['name'];

  constructor(private matrix: MatrixService) { }

  get controls(): Signal<ControlDto[]> {
    return this.matrix.matricesControls;
  }
}

import { Component, Input, output } from '@angular/core';
import { MatTableModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  onClickRow = output<Fractal>();

  @Input({ required: true }) dataSource: Fractal[] = [];
  @Input({ required: true }) displayedColumns: string[] = [];
  @Input({ required: true }) selectedRows!: Set<Fractal>;
}

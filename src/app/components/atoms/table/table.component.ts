import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columns!: string[];
  @Input() dataSource!: Fractal[];
  @Input() clickedRows!: Fractal[];
  row = output<Fractal>();
}

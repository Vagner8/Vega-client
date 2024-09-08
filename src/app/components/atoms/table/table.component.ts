import { Component, Input, output } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { FractalDto } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  onClick = output<FractalDto>();

  @Input({ required: true }) sort!: string[];
  @Input({ required: true }) dataSource!: FractalDto[];
}

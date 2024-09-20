import { Component, Input, output } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true }) fractal!: IFractal;
  @Input({ required: true }) clickedRows!: Set<string>;
  onClick = output<IFractal>();

  get sort(): string[] {
    return this.fractal.sort;
  }
}

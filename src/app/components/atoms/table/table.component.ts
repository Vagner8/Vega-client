import { Component, Input, output } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { FractalDto, IFractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true }) fractal!: IFractal;
  onClick = output<FractalDto>();

  get sort(): string[] {
    return this.fractal.controls.sort;
  }
}

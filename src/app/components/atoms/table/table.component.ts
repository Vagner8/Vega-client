import { Component, Input, output, ChangeDetectionStrategy } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input({ required: true }) fractal!: IFractal;
  @Input({ required: true }) clickedRows!: Set<IFractal>;
  onClick = output<IFractal>();

  get sort(): string[] {
    return this.fractal.sort;
  }
}

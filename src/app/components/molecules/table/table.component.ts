import { Component, Input } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { FractalService, StateService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true }) fractal: Fractal | null = null;

  constructor(
    public ss: StateService,
    public fls: FractalService,
  ) {}
}

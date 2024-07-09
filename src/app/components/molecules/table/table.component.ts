import { Component, Input, WritableSignal } from '@angular/core';
import { MatTableModule } from '@mat';
import { StateService } from '@services';
import { Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true }) fractal: Fractal | null = null;

  constructor(private ss: StateService) {}

  get page(): WritableSignal<string> {
    return this.ss.page;
  }
}

import { Component, inject, Input } from '@angular/core';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { ControlFields, Fractal } from '@types';

@Component({
  selector: 'app-controls-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './controls-table.component.html',
  styleUrl: './controls-table.component.scss',
})
export class ControlsTableComponent {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  columns = [ControlFields.indicator, ControlFields.data];
}

import { Component, inject, Input } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule } from '@mat';
import { SelectService } from '@services';
import { ControlFields, Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TapDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  @Input() printControls = false;

  get columns(): string[] {
    return this.printControls ? [ControlFields.indicator, ControlFields.data] : this.fractal.sort;
  }

  get dataSource(): unknown[] {
    return this.printControls ? this.fractal.controls : this.fractal.children;
  }
}

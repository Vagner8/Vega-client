import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent extends SuperComponent {
  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input() fractals: IFractal[] = [];
  hold = output<IFractal>();
  touch = output<IFractal>();
}

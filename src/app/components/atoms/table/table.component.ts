import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() rows!: IFractal[];
  @Input() columns!: string[];
  @Input() dataSource!: IFractal[];
  row = output<IFractal>();
}

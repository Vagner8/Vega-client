import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent extends SuperComponent {
  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input() dataSource: IFractal[] = [];
  hold = output<IFractal>();
  touch = output<IFractal>();
}

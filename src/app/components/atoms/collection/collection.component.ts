import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input() dataSource: IFractal[] = [];
  hold = output<IFractal>();
  touch = output<IFractal>();
}

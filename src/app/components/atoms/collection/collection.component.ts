import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { ControlDto, IFractal } from '@types';
import { Fractal } from '@utils';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input() dataSource: unknown[] = [];
  hold = output<IFractal>();
  touch = output<IFractal>();

  isFractal(item: unknown): item is IFractal {
    return item instanceof Fractal;
  }

  isControl(item: unknown): item is ControlDto {
    return !this.isFractal(item);
  }
}

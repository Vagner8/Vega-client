import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { ControlDto, IFractal } from '@types';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  @Input() like!: 'fractal' | 'control';
  @Input() rows: IFractal[] | ControlDto[] = [];
  @Input() columns: string[] = [];
  @Input() dataSource: unknown[] = [];
  hold = output<IFractal | ControlDto>();
  touch = output<IFractal | ControlDto>();

  isFractal(row: unknown): row is IFractal {
    return this.like === 'fractal';
  }

  isControl(row: unknown): row is ControlDto {
    return this.like === 'control';
  }
}

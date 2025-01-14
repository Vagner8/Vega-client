import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { SelectService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  ss = inject(SelectService);
  @Input() like: 'fractals' | 'controls' = 'fractals';
  @Input() fractal!: IFractal;

  get columns(): string[] {
    return this.like === 'controls' ? ['indicator', 'data'] : this.fractal.split('Columns');
  }

  get dataSource(): unknown[] {
    return this.like === 'controls' ? this.fractal.controlsArray : this.fractal.fractalsArray;
  }
}

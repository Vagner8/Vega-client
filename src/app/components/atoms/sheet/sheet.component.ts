import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { SelectService } from '@services';
import { ControlFields, Fractal, SplitIndicators } from '@types';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetComponent {
  ss = inject(SelectService);
  @Input() like: 'fractals' | 'controls' = 'fractals';
  @Input() fractal!: Fractal;

  get columns(): string[] {
    return this.like === 'controls'
      ? [ControlFields.indicator, ControlFields.data]
      : this.fractal.splitData(SplitIndicators.Sort);
  }

  get dataSource(): unknown[] {
    return this.like === 'controls' ? this.fractal.controlsArray : this.fractal.fractalsArray;
  }
}

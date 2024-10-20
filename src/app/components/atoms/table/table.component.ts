import { Component, Input, ChangeDetectionStrategy, output, OnDestroy } from '@angular/core';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, ClickDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnDestroy {
  @Input() columns!: string[];
  @Input() dataSource!: Fractal[];
  @Input() clickedRows!: Set<Fractal>;
  row = output<Fractal>();

  ngOnDestroy(): void {
    this.clickedRows.clear();
  }

  onClick(fractal: Fractal): void {
    if (this.clickedRows.has(fractal)) {
      this.clickedRows.delete(fractal);
    } else {
      this.clickedRows.add(fractal);
      this.row.emit(fractal);
    }
  }
}

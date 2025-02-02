import { Component, Input, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { SelectService } from '@services';
import { AppCollections, ControlFields, Fractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  ss = inject(SelectService);
  @Input() fractal!: Fractal;
  printFractals = false;

  ngOnInit(): void {
    this.printFractals = this.fractal.is(AppCollections);
    console.log('🚀 ~ this.printFractals:', this.printFractals);
  }

  get columns(): string[] {
    return this.printFractals ? this.fractal.sort : [ControlFields.indicator, ControlFields.data];
  }

  get dataSource(): unknown[] {
    return this.printFractals ? this.fractal.children : this.fractal.controls;
  }
}

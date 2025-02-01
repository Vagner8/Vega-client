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
  isCollection = false;

  ngOnInit(): void {
    this.isCollection = Object.hasOwn(AppCollections, this.fractal.cursor);
  }

  get columns(): string[] {
    const { indicator, data, input } = ControlFields;
    return this.isCollection ? this.fractal.sort : [indicator, data, input];
  }

  get dataSource(): unknown[] {
    return this.isCollection ? this.fractal.fractalsArray : this.fractal.controlsArray;
  }
}

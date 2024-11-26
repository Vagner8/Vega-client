import {
  Component,
  Input,
  ChangeDetectionStrategy,
  output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { EventDirective } from '@directives';
import { MatTableModule, MatSortModule, MatSort, MatTableDataSource } from '@mat';
import { IFractal } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, EventDirective, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort?: MatSort;
  private matTableDataSource!: MatTableDataSource<IFractal>;

  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input()
  set dataSource(fractals: IFractal[]) {
    this.matTableDataSource = new MatTableDataSource(fractals);
    this.matTableDataSource.sortingDataAccessor = (item, property) => item.data(property) || '';
    if (this.sort) this.matTableDataSource.sort = this.sort;
  }

  get dataSource(): MatTableDataSource<IFractal> {
    return this.matTableDataSource;
  }

  onRowTapOut = output<IFractal>();
  onRowHoldDoneOut = output<IFractal>();

  ngAfterViewInit() {
    if (this.sort) this.matTableDataSource.sort = this.sort;
  }
}

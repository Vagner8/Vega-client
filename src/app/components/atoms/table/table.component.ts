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
import { CdkDropList, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgTemplateOutlet, MatTableModule, EventDirective, MatSortModule, CdkDropList, CdkDrag],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent extends SuperComponent implements AfterViewInit {
  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input()
  set dataSource(fractals: IFractal[]) {
    this.matTableDataSource = new MatTableDataSource(fractals);
    this.matTableDataSource.sortingDataAccessor = (item, property): string => item.string(property);
    if (this.sort) this.matTableDataSource.sort = this.sort;
  }

  get dataSource(): MatTableDataSource<IFractal> {
    return this.matTableDataSource;
  }

  dropRows = output<CdkDragDrop<string>>();
  dropHeaders = output<CdkDragDrop<string[]>>();

  hold = output<IFractal>();
  touch = output<IFractal>();

  private matTableDataSource!: MatTableDataSource<IFractal>;

  @ViewChild(MatSort) sort?: MatSort;

  ngAfterViewInit(): void {
    if (this.sort) this.matTableDataSource.sort = this.sort;
  }
}

import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, ChangeDetectionStrategy, output } from '@angular/core';
import { TapDirective } from '@directives';
import { MatTableModule, MatSortModule } from '@mat';
import { IFractal } from '@types';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, TapDirective, MatSortModule, CdkDropList, CdkDrag],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent extends SuperComponent {
  @Input() rows: IFractal[] = [];
  @Input() columns: string[] = [];
  @Input() dataSource: IFractal[] = [];
  hold = output<IFractal>();
  touch = output<IFractal>();
  columnChanged = output<CdkDragDrop<string[]>>();

  ngOnInit(): void {
    console.log('🚀 ~ columns:', this.columns);
    console.log('🚀 ~ dataSource:', this.dataSource);
  }
}

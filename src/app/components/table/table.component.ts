import { Component, Input } from '@angular/core';
import { MatTableModule } from '@mat';
import { TableDto } from '@types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() dataSource?: TableDto[];
  
  get displayedColumns(): string[] {
    if (!this.dataSource) return [];
    console.log('🚀 ~ this.dataSource[0].fields.map(({name}) => name):', this.dataSource[0].fields.map(({name}) => name));
    console.log('🚀 ~ this.dataSource:', this.dataSource);
    return this.dataSource[0].fields.map(({name}) => name);
  }

  // ngDoCheck() {
  //   console.log('🚀 ~ this.dataSource:', this.dataSource);
  // }
}

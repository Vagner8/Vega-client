import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableModule } from '@mat';
import { SortPipe } from 'app/pipes/sort.pipe';
import { UnitDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, SortPipe],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  unit$!: Observable<UnitDto>;
  displayedColumns$!: Observable<string[]>;

  constructor() {}
}

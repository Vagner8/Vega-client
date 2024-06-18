import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTableModule } from '@mat';
import { UnitDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  unit$!: Observable<UnitDto>;
  displayedColumns$!: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {}
}

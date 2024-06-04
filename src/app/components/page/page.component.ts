import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ControlDto, MatrixDto } from '@types';
import { ControlService, MatrixService } from '@services';
import { MatTableModule } from '@mat';
import { SortPipe } from 'app/pipes/sort.pipe';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, SortPipe],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  matrixDto$!: Observable<MatrixDto>;
  displayedColumns$!: Observable<string[]>;

  constructor(
    private ar: ActivatedRoute,
    private matrix: MatrixService,
    private control: ControlService
  ) {}

  ngOnInit(): void {}
}

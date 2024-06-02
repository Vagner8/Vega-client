import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ControlDto } from '@types';
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
  controlsDto$!: Observable<ControlDto[]>;
  columns$!: Observable<string[]>;

  constructor(
    private ar: ActivatedRoute,
    private matrix: MatrixService,
    private control: ControlService
  ) {}

  ngOnInit(): void {
    this.controlsDto$ = this.ar.data.pipe(map(this.matrix.onInit));
    this.columns$ = this.controlsDto$.pipe(
      map((controlsDto) => {
        const sortControl = this.control.findDto('Sort', controlsDto);
        if ( sortControl?.data ) return sortControl.data.split(':');
        return controlsDto.map((c) => c.indicator)
      })
    );
  }
}

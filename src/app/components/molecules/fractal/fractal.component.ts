import { Component, Input } from '@angular/core';
import { MatTableModule } from '@mat';
import { FractalDto, Indicator } from '@types';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './fractal.component.html',
  styleUrl: './fractal.component.css',
})
export class FractalComponent {
  @Input() data!: FractalDto;

  get displayedColumns(): string[] {
    return this.data.controls[Indicator.Sort].data.split(':');
  }

  get dataSource(): FractalDto[] {
    return Object.values(this.data.fractals);
  }
}

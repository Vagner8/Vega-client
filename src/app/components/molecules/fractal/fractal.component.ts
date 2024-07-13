import { Component, Input, computed } from '@angular/core';
import { MatTableModule } from '@mat';
import { ControlService, FractalService, StateService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './fractal.component.html',
  styleUrl: './fractal.component.css',
})
export class FractalComponent {
  @Input() fractal!: FractalDto;
  @Input() page!: string;

  dataSource = computed(() => {
    console.log(
      '🚀 ~ Object.values(this.dto.fractals[this.page].fractals):',
      Object.values(this.fractal.fractals),
    );
    return Object.values(this.fractal.fractals);
  });
  displayedColumns = computed(() => {
    console.log(
      '🚀 ~ this.cs.sort(this.dto.fractals[this.page].controls):',
      this.cs.sort(this.fractal.controls),
    );

    return this.cs.sort(this.fractal.controls);
  });

  constructor(
    public fls: FractalService,
    private cs: ControlService,
    private ss: StateService,
  ) {}
}

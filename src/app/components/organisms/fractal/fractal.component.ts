import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlService, FractalService, StateService, TapService } from '@services';
import { FractalData, FractalDto, TapsFractals } from '@types';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, ClickDirective, ControlComponent, CommonModule],
  templateUrl: './fractal.component.html',
  styleUrl: './fractal.component.css',
})
export class FractalComponent {
  toAdd: FractalDto | null = null;
  toUpdate: FractalDto | null = null;
  selected = new Set<FractalDto>();

  constructor(
    private ss: StateService,
    private cs: ControlService,
    private ts: TapService,
    public fls: FractalService,
  ) {}

  data(dto: FractalDto | null, active: TapsFractals | null): FractalData | null {
    if (!dto || !active) return null;
    const fractal = dto.fractals[active];
    return {
      sort: this.cs.parse(fractal.controls).sort,
      dataSource: Object.values(fractal.fractals),
    };
  }

  onClick(dto: FractalDto): void {
    if (this.selected.has(dto)) {
      this.selected.delete(dto);
    } else {
      this.ts.set('Actions');
      this.selected.add(dto);
    }
  }

  onDoubleClick(dto: FractalDto): void {
    this.ts.set('Actions');
    this.ss.sidenav.set('Open');
    this.toUpdate = dto;
  }
}

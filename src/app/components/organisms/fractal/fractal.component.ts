import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlService, FractalService, RouterService, StateService, TapService } from '@services';
import { FractalData, FractalDto, FractalsNames, TapModifiersNames } from '@types';

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
    public rs: RouterService,
    public fls: FractalService,
  ) {}

  data(dto: FractalDto | null, active: FractalsNames | null): FractalData | null {
    if (!dto || !active) return null;
    const fractal = dto.fractals[active];
    return {
      sort: this.cs.parse(fractal.controls).sort,
      dataSource: Object.values(fractal.fractals),
    };
  }

  onClick(dto: FractalDto): void {
    this.openSidenav();
    if (this.selected.has(dto)) {
      this.selected.delete(dto);
    } else {
      this.selected.add(dto);
    }
    this.disableTaps();
  }

  onDoubleClick(dto: FractalDto): void {
    this.openSidenav();
    this.toUpdate = dto;
    this.disableTaps();
  }

  private openSidenav(): void {
    this.ss.sidenav.set('Open');
    this.ts.set('modifiers');
  }

  private disableTaps(): void {
    let names: TapModifiersNames[] = [];
    if (this.selected.size === 0) {
      names = ['Add'];
    }
    if (this.selected.size === 1) {
      names = ['Add', 'Edit', 'Delete'];
    }
    if (this.selected.size > 1) {
      names = ['Add', 'Delete'];
    }
    this.ts.onModifiers(names);
  }
}

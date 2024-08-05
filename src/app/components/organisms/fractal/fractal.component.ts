import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlsComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlService, FractalService, RouterService, StateService, TapService } from '@services';
import { FractalData, FractalDto, FractalsNames, TapModifiersNames } from '@types';

@Component({
  selector: 'app-fractal',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, ClickDirective, ControlsComponent, CommonModule],
  templateUrl: './fractal.component.html',
  styleUrl: './fractal.component.css',
})
export class FractalComponent {
  constructor(
    public rs: RouterService,
    public fls: FractalService,

    private ss: StateService,
    private cs: ControlService,
    private ts: TapService,
  ) {}

  data(dto: FractalDto | null, page?: FractalsNames): FractalData | null {
    if (!dto || !page) return null;
    const fractal = dto.fractals[page];
    return {
      sort: this.cs.parse(fractal.controls).sort,
      dataSource: Object.values(fractal.fractals),
    };
  }

  onClick(dto: FractalDto): void {
    this.openSidenav();
    if (this.fls.selected.has(dto)) {
      this.fls.selected.delete(dto);
    } else {
      this.fls.selected.add(dto);
    }
    this.activateModifiers();
  }

  onDoubleClick(dto: FractalDto): void {
    this.openSidenav();
    this.fls.selected.clear();
    this.fls.selected.add(dto);
    this.activateModifiers();
  }

  private openSidenav(): void {
    this.ss.sidenav.set('Open');
    this.ts.set('modifiers');
  }

  private activateModifiers(): void {
    let names: TapModifiersNames[] = [];
    if (this.fls.selected.size === 0) {
      names = ['Add'];
    }
    if (this.fls.selected.size === 1) {
      names = ['Add', 'Edit', 'Delete'];
    }
    if (this.fls.selected.size > 1) {
      names = ['Add', 'Delete'];
    }
    this.ts.activateModifiers(names);
  }
}

import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlsComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlService, FractalService, RouterService } from '@services';
import { TableData, FractalDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, ClickDirective, ControlsComponent, CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  data = computed<TableData | null>(() => this.computedData());

  constructor(
    public rs: RouterService,
    public fls: FractalService,

    private cs: ControlService,
  ) {}

  onClick(fractal: FractalDto): void {
    if (this.fls.selected().includes(fractal)) this.fls.delete(fractal);
    else this.fls.add(fractal);
  }

  onDoubleClick(fractal: FractalDto): void {
    this.fls.clear();
    this.fls.add(fractal);
  }

  private computedData(): TableData | null {
    const { page } = this.rs.params();
    const fractal = this.fls.data()?.fractals[page!];
    if (!fractal) return null;
    return {
      sort: this.cs.parse(fractal.controls).sort,
      dataSource: Object.values(fractal.fractals),
    };
  }
}

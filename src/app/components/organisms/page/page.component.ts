import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlsComponent } from '@components/atoms';
import { ClickDirective } from '@directives';
import { MatTableModule } from '@mat';
import { ControlsPipe } from '@pipes';
import { ControlService, FractalService, RouterService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    ClickDirective,
    ControlsComponent,
    CommonModule,
    ControlsPipe,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  constructor(
    public rs: RouterService,
    public fs: FractalService,
    private cs: ControlService,
  ) {}
  // onClick(fractal: FractalDto): void {
  //   if (this.fls.selected().includes(fractal)) this.fls.delete(fractal);
  //   else this.fls.add(fractal);
  // }
  // onDoubleClick(fractal: FractalDto): void {
  //   this.fls.clear();
  //   this.fls.add(fractal);
  // }

  dataSource(fractal: FractalDto): FractalDto[] {
    console.log('🚀 ~ fractal:', fractal);
    return [];
  }
}

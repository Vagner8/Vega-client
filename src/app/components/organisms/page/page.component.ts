import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FractalService, RouterService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  constructor(
    public rs: RouterService,
    public fs: FractalService
  ) {}

  onClick(fractal: FractalDto): void {
    console.log('🚀 ~ fractal:', fractal);
  }
}

import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { FractalService, RouterService } from '@services';
import { FractalDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  fractal = computed(() => {
    const [page] = this.rs.params();
    return page && this.fs.root()?.find(page);
  });
  constructor(
    private rs: RouterService,
    private fs: FractalService
  ) {}

  onClick(fractal: FractalDto): void {
    console.log('🚀 ~ fractal:', fractal);
  }
}

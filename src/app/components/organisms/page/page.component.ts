import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { FractalService, RouterService } from '@services';
import { IFractal } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  fractal = computed(() => this.fs.fractal()?.find(this.rs.params()[0]));

  constructor(
    public rs: RouterService,
    private fs: FractalService
  ) {}

  onClick({ id }: IFractal): void {
    this.rs.navigateById(id);
  }
}

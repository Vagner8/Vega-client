import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { RouterService, FractalService } from '@services';
import { Roots, IFractal, ClickType } from '@types';
import { TapComponent } from '@components/atoms';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, TapComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  open = computed(() => this.rs.manager() === ClickType.One);
  fractal = computed(() => this.fractalComputed());

  constructor(
    private rs: RouterService,
    private fs: FractalService
  ) {}

  onClick({ name, type }: IFractal) {
    this.rs.navigateByParam(name, type);
  }

  private fractalComputed(): IFractal | undefined {
    return this.fs.fractal()?.find(Roots[this.rs.ids().length ? 'Modifiers' : 'Pages']);
  }
}

import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { RouterService, ManagerService, FractalService } from '@services';
import { FractalTapsNames, IFractal } from '@types';
import { TapComponent } from '@components/atoms';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, TapComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  fractal = computed(() => this.fs.root()?.find(FractalTapsNames.Pages));

  constructor(
    public ms: ManagerService,
    private rs: RouterService,
    private fs: FractalService
  ) {}

  onClick({ controls }: IFractal) {
    this.rs.navigate([controls.name]);
  }
}

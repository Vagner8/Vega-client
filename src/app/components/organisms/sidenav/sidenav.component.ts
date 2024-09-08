import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { RouterService, TapService, ManagerService } from '@services';
import { isPagesNames } from '@utils';
import { ControlsPipe } from '@pipes';
import { FractalDto } from '@types';
import { RenderComponent } from '@components/molecules';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, RenderComponent, RouterOutlet],
  providers: [ControlsPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  open = computed(() => this.ms.clickType() !== 'hold');

  constructor(
    public ts: TapService,
    private ms: ManagerService,
    private rs: RouterService,
    private cp: ControlsPipe
  ) {}

  onClick(fractal: FractalDto) {
    const name = this.cp.transform(fractal).Fractal;
    this.rs.navigate(isPagesNames(name) ? name : null);
  }
}

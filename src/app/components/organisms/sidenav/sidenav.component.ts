import { Component, computed, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { RouterService, ManagerService } from '@services';
import { ControlsPipe } from '@pipes';
import { IFractal } from '@types';
import { TapComponent } from '@components/atoms';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, TapComponent, RouterOutlet],
  providers: [ControlsPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  @Input({ required: true }) fractal!: IFractal;
  open = computed(() => this.ms.clickType() !== 'hold');

  constructor(
    private ms: ManagerService,
    private rs: RouterService
  ) {}

  onClick(fractal: IFractal) {
    this.rs.navigate(fractal.data('Fractal'));
  }
}

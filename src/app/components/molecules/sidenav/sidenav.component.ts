import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, TapService } from '@services';
import { ManagerService } from 'app/services/manager.service';
import { RenderComponent } from '../render/render.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, RenderComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  open = computed(() => this.ms.clickType() !== 'hold');

  constructor(
    public ts: TapService,
    public fs: FractalService,
    public ms: ManagerService
  ) {}
}

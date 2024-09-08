import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, TapService } from '@services';
import { ManagerService } from 'app/services/manager.service';
import { ArrayPipe, FractalPipe, ControlsPipe } from '@pipes';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    TapComponent,
    ArrayPipe,
    FractalPipe,
    RouterOutlet,
    ControlsPipe,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  open = computed(() => this.computedOpen());

  constructor(
    public ts: TapService,
    public fs: FractalService,
    public ms: ManagerService,
  ) {}

  private computedOpen(): boolean {
    return this.ms.clickType() !== 'hold';
  }
}

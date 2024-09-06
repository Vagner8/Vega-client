import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { FractalService, TapService } from '@services';
import { ManagerService } from 'app/services/manager.service';
import { FractalDto } from '@types';
import { ControlsDataPipe } from '@pipes';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatListModule,
    MatSidenavModule,
    TapComponent,
    ControlsDataPipe,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  taps = computed<FractalDto[] | null>(() => this.computedTaps());
  open = computed(() => this.computedOpen());

  constructor(
    public ts: TapService,
    public fs: FractalService,
    public ms: ManagerService,
  ) {}

  private computedOpen(): boolean {
    return this.ms.clickType() !== 'hold';
  }

  private computedTaps(): FractalDto[] | null {
    const taps = this.ms.clickType() === 'one' ? this.fs.Pages() : null;
    return taps && Object.values(taps.fractals);
  }
}

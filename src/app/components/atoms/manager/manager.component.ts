import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { FractalService, StateService, TapService } from '@services';
import { SidenavState, TapsSidenavs } from '@types';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatProgressSpinner, ClickDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  constructor(
    public ss: StateService,
    public ts: TapService,
    public fls: FractalService,
  ) {}

  onClick(): void {
    this.common('Open', 'Fractals');
  }

  onHoldClick(): void {
    this.common('Open', 'Settings');
  }

  onDblclick(): void {
    this.common('Close', null);
  }

  private common(state: SidenavState, type: TapsSidenavs | null): void {
    this.ss.sidenav.set(state);
    this.ts.set(type);
  }
}

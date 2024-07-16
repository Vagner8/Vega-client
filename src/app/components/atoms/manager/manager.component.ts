import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { FractalService, SidenavService, StateService, TapService } from '@services';
import { SidenavState } from '@types';

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
    public svs: SidenavService,
    public fls: FractalService,
  ) {}

  onClick() {
    this.common('Open');
    this.ts.setView('Pages');
  }

  onHoldClick() {
    this.common('Open');
    this.ts.setView('Settings');
  }

  onDoubleClick() {
    this.common('Close');
    this.ts.location.set(null);
  }

  private common(sidenavState: SidenavState) {
    this.svs.state.set(sidenavState);
    this.fls.clean();
  }
}

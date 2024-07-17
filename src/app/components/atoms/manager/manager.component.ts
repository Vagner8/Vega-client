import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { FractalService, SelectService, SidenavService, StateService, TapService } from '@services';
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
    public sts: SelectService,
  ) {}

  onClick() {
    this.common('Open');
    this.ts.set('Pages');
  }

  onHoldClick() {
    this.common('Open');
    this.ts.set('Settings');
  }

  onDoubleClick() {
    this.common('Close');
    this.ts.location.set(null);
  }

  private common(sidenavState: SidenavState) {
    this.sts.clean();
    this.svs.state.set(sidenavState);
  }
}

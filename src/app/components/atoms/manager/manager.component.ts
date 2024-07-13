import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { StateService, TapService } from '@services';

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
    private ts: TapService,
  ) {}

  onClick() {
    this.ss.sidenav.set('Open');
    this.ts.setView('Pages');
  }

  onHoldClick() {
    this.ss.sidenav.set('Open');
    this.ts.setView('Settings');
  }

  onDoubleClick() {
    this.ss.sidenav.set('Close');
  }
}

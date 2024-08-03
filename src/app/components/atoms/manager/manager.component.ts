import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { FractalService, StateService, TapService } from '@services';

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
    this.ss.sidenav.set('Open');
    this.ts.set('pages');
  }

  onHoldClick(): void {
    this.ss.sidenav.set('Open');
    this.ts.set('settings');
  }

  onDblclick(): void {
    this.ss.sidenav.set('Close');
  }
}

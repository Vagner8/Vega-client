import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { RouterService, StateService, TapService } from '@services';

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
    private rs: RouterService,
  ) {}

  onClick(): void {
    this.ts.manager.set(1);
  }

  onHoldClick(): void {
    if (this.rs.segments().page === 'Home') return;
    this.ts.manager.set(2);
  }

  onDblclick(): void {
    this.ts.manager.set(3);
  }
}

import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule, MatIcon, MatListModule, MatSidenavModule } from '@mat';
import { StateService, TapService } from '@services';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatSidenavModule, MatIcon, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  constructor(
    private ss: StateService,
    private ts: TapService,
  ) {}

  get opened(): WritableSignal<boolean> {
    return this.ss.sidenav;
  }

  get active$() {
    return this.ts.active$;
  }
}

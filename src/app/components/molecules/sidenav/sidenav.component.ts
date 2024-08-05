import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TapComponent } from '@components/atoms';
import { MatListModule, MatSidenavModule } from '@mat';
import { RouterService, StateService, TapService } from '@services';
import { TapTypes } from '@types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatSidenavModule, TapComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  constructor(
    public ts: TapService,
    public ss: StateService,

    public rs: RouterService,
  ) {}

  private set(name: TapTypes): void {
    this.ss.sidenav.set('Open');
    this.ts.set(name);
  }
}

import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { StateService, TapService } from '@services';
import { ExecutorComponent } from '@components/atoms';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, MatSidenavModule, ExecutorComponent],
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

  get executors$() {
    return this.ts.executors$;
  }
}

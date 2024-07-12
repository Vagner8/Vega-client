import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ClickDirective } from '@directives';
import { MatProgressSpinner } from '@mat';
import { StateService } from '@services';
import { taps } from '@utils';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatProgressSpinner, ClickDirective],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  constructor(public ss: StateService) {}

  onClick() {
    this.ss.sidenav.set('open');
    this.ss.taps.set(taps.Pages);
  }

  onHoldClick() {
    this.ss.sidenav.set('open');
    this.ss.taps.set(taps.Settings);
  }

  onDoubleClick() {
    this.ss.sidenav.set('close');
  }
}

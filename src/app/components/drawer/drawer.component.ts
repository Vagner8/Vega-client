import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { DrawerStateService } from '@services';
import { ActionsDrawerComponent } from './actions-drawer/actions-drawer.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatSidenavModule,
    ActionsDrawerComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  constructor(private _drawerStateService: DrawerStateService) {}

  get opened() {
    return this._drawerStateService.opened;
  }

  onClose() {
    this.opened.set(false);
  }
}

import { Component, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule, MatSidenavModule } from '@mat';
import { StateService } from '@services';
import { DrawerTapsComponent } from './drawer-taps/drawer-taps.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterOutlet, MatListModule, MatSidenavModule, DrawerTapsComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  constructor(private state: StateService) {}

  get opened(): WritableSignal<boolean> {
    return this.state.drawerOpened;
  }
}

import { Component, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule, MatIcon, MatSidenavModule, MatButton } from '@mat';
import { DrawerTriggers, GlobalStateService } from '@services';
import { ScrollToBottomDirective } from 'app/directives/scroll-to-bottom.directive';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatListModule,
    MatIcon,
    MatSidenavModule,
    MatButton,
    ScrollToBottomDirective
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  public drawerOpened!: WritableSignal<boolean>;
  public drawerTrigger!: WritableSignal<DrawerTriggers>; 

  constructor(private _globalStateService: GlobalStateService) {
    this.drawerOpened = this._globalStateService.drawerOpened;
    this.drawerTrigger = this._globalStateService.drawerTrigger;
  }

  public onCloseDrawer(): void {
    this.drawerOpened.set(false);
  }
}

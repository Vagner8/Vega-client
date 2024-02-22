import { Component, OnInit, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule, MatIcon, MatSidenavModule, MatButton } from '@mat';
import { DrawerStateService } from '@services';
import { DrawerTypes } from '@types';
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
export class DrawerComponent implements OnInit {
  public drawerIsOpened!: WritableSignal<boolean>;
  public drawerTrigger!: WritableSignal<DrawerTypes.Triggers>; 

  constructor(private _drawerStateService: DrawerStateService) {}

  public ngOnInit(): void {
    this.drawerIsOpened = this._drawerStateService.isOpened;
    this.drawerTrigger = this._drawerStateService.trigger;
  }

  public onCloseDrawer(): void {
    this.drawerIsOpened.set(false);
  }
}

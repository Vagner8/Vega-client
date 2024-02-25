import { Component, OnInit, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule, MatIcon, MatSidenavModule, MatButton } from '@mat';
import { DrawerStateService } from '@services';
import { TriggersType } from '@types';
import { ScrollToBottomDirective } from 'app/directives/scroll-to-bottom.directive';
import { TriggersComponent } from './triggers/triggers.component';

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
    ScrollToBottomDirective,
    TriggersComponent
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent implements OnInit {
  public drawerOpened!: WritableSignal<boolean>;
  public drawerTrigger!: WritableSignal<keyof TriggersType.Buttons>;

  constructor(private _drawerStateService: DrawerStateService) {}

  public ngOnInit(): void {
    this.drawerOpened = this._drawerStateService.opened;
    this.drawerTrigger = this._drawerStateService.trigger;
  }

  public onCloseDrawer(): void {
    this._drawerStateService.setOpened(false);
  }
}

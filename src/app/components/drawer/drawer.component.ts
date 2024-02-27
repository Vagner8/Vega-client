import { Component, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule, MatIcon, MatSidenavModule, MatButton } from '@mat';
import { DrawerStateService } from '@services';
import { ScrollToBottomDirective } from 'app/directives/scroll-to-bottom.directive';
import { DrawerTrigger, DrawerTriggers, IconName, PagePath } from '@types';

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
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  public opened: WritableSignal<boolean> = this._drawerStateService.opened;
  public trigger: WritableSignal<keyof DrawerTriggers> = this._drawerStateService.trigger;

  constructor(private _drawerStateService: DrawerStateService) {}

  public onClose(): void {
    this._drawerStateService.setOpened(false);
  }

  public createButtons(key: keyof DrawerTriggers): DrawerTrigger[] {
    const drawerTriggers = {
      actions: [
        this._createButton($localize`Create`, IconName.Add),
        this._createButton($localize`Edit`, IconName.Edit),
        this._createButton($localize`Delete`, IconName.Delete),
      ],
      pages: [
        this._createButton($localize`Home`, IconName.Home, PagePath.Home),
        this._createButton($localize`Users`, IconName.Group, PagePath.Users),
      ],
      settings: [],
    };
    return drawerTriggers[key];
  }

  private _createButton(
    label: string,
    iconName: IconName,
    pagePath?: PagePath,
  ): DrawerTrigger {
    return {
      label,
      iconName,
      pagePath,
    };
  }
}

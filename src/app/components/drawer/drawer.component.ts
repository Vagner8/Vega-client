import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule, MatIcon, MatSidenavModule, MatButton } from '@mat';
import {
  ActionsStateService,
  CommonStateService,
  DrawerStateService,
} from '@services';
import { ScrollToBottomDirective } from 'app/directives/scroll-to-bottom.directive';
import { DrawerTrigger, DrawerTriggers, IconName, TriggerName } from '@types';

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
  constructor(
    private _drawerStateService: DrawerStateService,
    private _commonStateService: CommonStateService,
    private _actionsStateService: ActionsStateService
  ) {}

  get send() {
    return this._actionsStateService.send;
  }

  get edit() {
    return this._actionsStateService.edit;
  }

  get opened() {
    return this._drawerStateService.opened;
  }

  get trigger() {
    return this._drawerStateService.trigger;
  }

  onClose() {
    this._drawerStateService.setOpened(false);
  }

  createDrawerTriggers(trigger: keyof DrawerTriggers | null) {
    if (!trigger) return;
    const drawerTriggers: DrawerTriggers = {
      actions: [
        this._createDrawerTrigger(TriggerName.Delete, IconName.Delete, {
          confirm: true,
        }),
        this._createDrawerTrigger(TriggerName.Create, IconName.Add),
        this._createDrawerTrigger(TriggerName.Edit, IconName.Edit, {
          disabled: this.edit().disabled,
        }),
        this._createDrawerTrigger(TriggerName.Send, IconName.Send, {
          disabled: this.send().disabled,
          confirm: true,
        }),
      ],
      pages: [
        this._createDrawerTrigger(TriggerName.Home, IconName.Home),
        this._createDrawerTrigger(TriggerName.Users, IconName.Group),
      ],
      settings: [],
    };
    return drawerTriggers[trigger];
  }

  getRouterLink(drawerTriggerName: string) {
    const trigger = this.trigger();
    if (trigger !== 'actions') return drawerTriggerName;
    return `${
      this._commonStateService.url().split('/')[1]
    }/${drawerTriggerName}`;
  }

  private _createDrawerTrigger(
    name: DrawerTrigger['name'],
    icon: DrawerTrigger['icon'],
    option?: DrawerTrigger['option']
  ) {
    return {
      name,
      icon,
      option,
    };
  }
}

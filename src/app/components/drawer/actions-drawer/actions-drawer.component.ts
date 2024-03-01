import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatIcon } from '@mat';
import {
  ActionsStateService,
  CommonStateService,
  DrawerStateService,
} from '@services';
import { ActionName, DrawerAction, DrawerActions, IconName } from '@types';

@Component({
  selector: 'app-actions-drawer',
  standalone: true,
  imports: [RouterLink, MatIcon, MatButton],
  templateUrl: './actions-drawer.component.html',
  styleUrl: './actions-drawer.component.css',
})
export class ActionsDrawerComponent {
  constructor(
    private _actionsStateService: ActionsStateService,
    private _drawerStateService: DrawerStateService,
    private _commonStateService: CommonStateService
  ) {}

  get send() {
    return this._actionsStateService.send;
  }

  get edit() {
    return this._actionsStateService.edit;
  }

  get currentAction() {
    return this._drawerStateService.currentAction;
  }

  commonActions() {
    const currentAction = this.currentAction();
    if (!currentAction) return;
    const drawerActions: DrawerActions = {
      actions: this._actions(),
      pages: this._pages(),
      settings: this._settings(),
    };
    return drawerActions[currentAction];
  }

  confirmActions() {
    return [
      this._create(ActionName.Confirm, IconName.Task_alt),
      this._create(ActionName.Cancel, IconName.Cancel),
    ];
  }

  getRouterLink(drawerActionName: string) {
    const currentAction = this.currentAction();
    if (currentAction !== 'actions') return drawerActionName;
    return `${
      this._commonStateService.url().split('/')[1]
    }/${drawerActionName}`;
  }

  private _actions() {
    return [
      this._create(ActionName.Delete, IconName.Delete, {
        confirm: true,
      }),
      this._create(ActionName.Create, IconName.Add),
      this._create(ActionName.Edit, IconName.Edit, {
        disabled: this.edit().disabled,
      }),
      this._create(ActionName.Send, IconName.Send, {
        disabled: this.send().disabled,
        confirm: true,
      }),
    ];
  }

  private _pages() {
    return [
      this._create(ActionName.Home, IconName.Home),
      this._create(ActionName.Users, IconName.Group),
    ];
  }

  private _settings() {
    return [];
  }

  private _create(
    name: DrawerAction['name'],
    icon: DrawerAction['icon'],
    option?: DrawerAction['option']
  ) {
    return {
      name,
      icon,
      option,
    };
  }
}

import { Injectable, signal } from '@angular/core';
import {
  IconName,
  Visibility,
  BtnActState,
  ActiveBtnActName,
  NavigationBtnActName,
  ToolbarBtnActName,
  BtnActType,
  BtnActGroup,
  BtnAct,
  BtnActName,
  SettingsBtnActName,
} from '@types';

@Injectable({
  providedIn: 'root',
})
export class BtnActService {
  public readonly acts!: BtnActGroup;

  constructor() {
    this.acts = this._createActs();
  }

  getActs(type: BtnActType | BtnActName): BtnAct[] {
    return this.acts[type];
  }

  getActive(name: ActiveBtnActName): BtnAct {
    return this._get(this.acts[BtnActType.Active], name);
  }

  getNavigation(name: NavigationBtnActName): BtnAct {
    return this._get(this.acts[BtnActType.Navigation], name);
  }

  getSettings(name: SettingsBtnActName): BtnAct {
    return this._get(this.acts[BtnActType.Settings], name);
  }

  getToolbar(name: ToolbarBtnActName): BtnAct {
    return this._get(this.acts[BtnActType.Toolbar], name);
  }

  private _get(acts: BtnAct[], name: BtnActName): BtnAct {
    const act = acts.find((act) => act.name === name);
    if (!act) throw new Error(`No BtnAct: ${name}`);
    return act;
  }

  private _createActs = (): BtnActGroup => {
    return {
      [BtnActType.Active]: [
        this._createAct(ActiveBtnActName.Send, BtnActType.Active, {
          visibility: Visibility.Visible,
          icon: IconName.Send,
          disabled: true,
          confirm: true,
          navigate: false,
        }),
        this._createAct(ActiveBtnActName.Edit, BtnActType.Active, {
          visibility: Visibility.Visible,
          icon: IconName.Edit,
          disabled: true,
          confirm: false,
          navigate: true,
        }),
        this._createAct(ActiveBtnActName.Delete, BtnActType.Active, {
          visibility: Visibility.Visible,
          icon: IconName.Delete,
          disabled: true,
          confirm: false,
          navigate: false,
        }),
        this._createAct(ActiveBtnActName.Confirm, BtnActType.Active, {
          visibility: Visibility.Hidden,
          icon: IconName.Task_alt,
          disabled: false,
          confirm: false,
          navigate: false,
        }),
        this._createAct(ActiveBtnActName.Cancel, BtnActType.Active, {
          visibility: Visibility.Hidden,
          icon: IconName.Cancel,
          disabled: false,
          confirm: false,
          navigate: false,
        }),
        this._createAct(ActiveBtnActName.Create, BtnActType.Active, {
          visibility: Visibility.Visible,
          icon: IconName.Add,
          disabled: false,
          confirm: true,
          navigate: true,
        }),
      ],
      [BtnActType.Navigation]: [
        this._createAct(NavigationBtnActName.Home, BtnActType.Navigation, {
          visibility: Visibility.Visible,
          icon: IconName.Home,
          disabled: false,
          confirm: false,
          navigate: true,
        }),
        this._createAct(NavigationBtnActName.Users, BtnActType.Navigation, {
          visibility: Visibility.Visible,
          icon: IconName.Group,
          disabled: false,
          confirm: false,
          navigate: true,
        }),
      ],
      [BtnActType.Settings]: [],
      [BtnActType.Toolbar]: [
        this._createAct(ToolbarBtnActName.Settings, BtnActType.Toolbar, {
          visibility: Visibility.Visible,
          icon: IconName.Settings,
          disabled: true,
          confirm: false,
          navigate: false,
        }),
        this._createAct(ToolbarBtnActName.Navigation, BtnActType.Toolbar, {
          visibility: Visibility.Visible,
          icon: IconName.Apps,
          disabled: false,
          confirm: false,
          navigate: false,
        }),
        this._createAct(ToolbarBtnActName.Active, BtnActType.Toolbar, {
          visibility: Visibility.Visible,
          icon: IconName.Filter_list,
          disabled: true,
          confirm: false,
          navigate: false,
        }),
      ],
    };
  };

  private _createAct = (
    name: BtnAct['name'],
    type: BtnAct['type'],
    defaultState: BtnActState
  ): BtnAct => {
    return {
      name,
      type,
      signal: signal(defaultState),
      update(value) {
        this.signal.update((state) => ({ ...state, ...value }));
      },
      reset(key) {
        this.signal.update((state) => ({ ...state, [key]: defaultState[key] }));
      },
    };
  };
}

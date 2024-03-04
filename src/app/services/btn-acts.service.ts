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
} from '@types';

@Injectable({
  providedIn: 'root',
})
export class BtnActService {
  private readonly _acts!: BtnActGroup;

  constructor() {
    this._acts = this._createActs();
  }

  getActs(type: BtnActType | BtnActName): BtnAct[] {
    return this._acts[type];
  }

  getActive(name: ActiveBtnActName): BtnAct {
    return this._get(this._acts[BtnActType.Active], name);
  }

  getNavigation(name: ActiveBtnActName): BtnAct {
    return this._get(this._acts[BtnActType.Navigation], name);
  }

  getSettings(name: ActiveBtnActName): BtnAct {
    return this._get(this._acts[BtnActType.Settings], name);
  }

  getToolbar(name: ActiveBtnActName): BtnAct {
    return this._get(this._acts[BtnActType.Toolbar], name);
  }

  private _get(acts: BtnAct[], name: ActiveBtnActName): BtnAct {
    const act = acts.find((act) => act.name === name);
    if (!act) throw new Error(`No BtnAct: ${name}`);
    return act;
  }

  private _createActs = (): BtnActGroup => {
    return {
      [BtnActType.Active]: [
        this._createAct(
          ActiveBtnActName.Send,
          BtnActType.Active,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Send,
            disabled: true,
            confirm: true,
            link: false,
          })
        ),
        this._createAct(
          ActiveBtnActName.Edit,
          BtnActType.Active,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Edit,
            disabled: true,
            confirm: false,
            link: true,
          })
        ),
        this._createAct(
          ActiveBtnActName.Delete,
          BtnActType.Active,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Delete,
            disabled: true,
            confirm: false,
            link: false,
          })
        ),
        this._createAct(
          ActiveBtnActName.Confirm,
          BtnActType.Active,
          signal<BtnActState>({
            visibility: Visibility.Hidden,
            icon: IconName.Task_alt,
            disabled: false,
            confirm: false,
            link: false,
          })
        ),
        this._createAct(
          ActiveBtnActName.Cancel,
          BtnActType.Active,
          signal<BtnActState>({
            visibility: Visibility.Hidden,
            icon: IconName.Cancel,
            disabled: false,
            confirm: false,
            link: false,
          })
        ),
        this._createAct(
          ActiveBtnActName.Create,
          BtnActType.Active,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Add,
            disabled: false,
            confirm: true,
            link: true,
          })
        ),
      ],
      [BtnActType.Navigation]: [
        this._createAct(
          NavigationBtnActName.Home,
          BtnActType.Navigation,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Home,
            disabled: false,
            confirm: false,
            link: true,
          })
        ),
        this._createAct(
          NavigationBtnActName.Users,
          BtnActType.Navigation,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Group,
            disabled: false,
            confirm: false,
            link: true,
          })
        ),
      ],
      [BtnActType.Settings]: [],
      [BtnActType.Toolbar]: [
        this._createAct(
          ToolbarBtnActName.Settings,
          BtnActType.Toolbar,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Settings,
            disabled: false,
            confirm: false,
            link: false,
          })
        ),
        this._createAct(
          ToolbarBtnActName.Navigation,
          BtnActType.Toolbar,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Apps,
            disabled: false,
            confirm: false,
            link: false,
          })
        ),
        this._createAct(
          ToolbarBtnActName.Active,
          BtnActType.Toolbar,
          signal<BtnActState>({
            visibility: Visibility.Visible,
            icon: IconName.Filter_list,
            disabled: false,
            confirm: false,
            link: false,
          })
        ),
      ],
    };
  };

  private _createAct = (
    name: BtnAct['name'],
    type: BtnAct['type'],
    signal: BtnAct['signal']
  ): BtnAct => {
    return {
      name,
      type,
      signal,
    };
  };
}

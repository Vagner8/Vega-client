import { Injectable, signal } from '@angular/core';
import { BtnState, BtnGroup, Btn, BtnName, BtnType } from '@types';
import { RecService } from './rec.service';

@Injectable({
  providedIn: 'root',
})
export class BtnService {
  public readonly btns!: BtnGroup;

  constructor(private _rec: RecService) {
    this.btns = this._createBtns();
  }

  get(type: BtnType, name: BtnName): Btn {
    const act = this.btns[type].find((act) => act.name === name);
    if (!act) throw new Error(`No Btn: ${name}`);
    return act;
  }

  private _createBtns = (): BtnGroup => {
    return {
      active: [
        this._createBtn('Send', 'active', {
          visibility: 'visible',
          icon: 'send',
          disabled: true,
          confirm: true,
          navigate: false,
        }),
        this._createBtn('Edit', 'active', {
          visibility: 'visible',
          icon: 'edit',
          disabled: true,
          confirm: false,
          navigate: true,
        }),
        this._createBtn('Delete', 'active', {
          visibility: 'visible',
          icon: 'delete',
          disabled: true,
          confirm: false,
          navigate: false,
        }),
        this._createBtn('Confirm', 'active', {
          visibility: 'hidden',
          icon: 'task_alt',
          disabled: false,
          confirm: false,
          navigate: false,
        }),
        this._createBtn('Cancel', 'active', {
          visibility: 'hidden',
          icon: 'cancel',
          disabled: false,
          confirm: false,
          navigate: false,
        }),
        this._createBtn('Create', 'active', {
          visibility: 'visible',
          icon: 'add',
          disabled: false,
          confirm: true,
          navigate: true,
        }),
      ],
      navigation: [
        this._createBtn('Home', 'navigation', {
          visibility: 'visible',
          icon: 'home',
          disabled: false,
          confirm: false,
          navigate: true,
        }),
        this._createBtn('Users', 'navigation', {
          visibility: 'visible',
          icon: 'group',
          disabled: false,
          confirm: false,
          navigate: true,
        }),
      ],
      settings: [],
      toolbar: [
        this._createBtn('settings', 'toolbar', {
          visibility: 'visible',
          icon: 'settings',
          disabled: true,
          confirm: false,
          navigate: false,
        }),
        this._createBtn('navigation', 'toolbar', {
          visibility: 'visible',
          icon: 'apps',
          disabled: false,
          confirm: false,
          navigate: false,
        }),
        this._createBtn('active', 'toolbar', {
          visibility: 'visible',
          icon: 'filter_list',
          disabled: true,
          confirm: false,
          navigate: false,
        }),
      ],
    };
  };

  private _createBtn = (
    name: BtnName,
    type: BtnType,
    defaultState: BtnState
  ): Btn => {
    const rec = this._rec;
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
      rec() {
        rec.write('btn', type, name);
      }
    };
  };
}

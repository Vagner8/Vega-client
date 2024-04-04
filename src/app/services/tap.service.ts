import { Injectable, signal } from '@angular/core';
import {
  IconName,
  Tap,
  ActionTapName,
  TapName,
  TapOptions,
  PageTapName,
  TapPlace,
  TapState,
  ToolbarTapName,
  Visibility,
  RouteParam,
} from '@types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  private readonly _taps = new Map<string, Tap[]>();
  private readonly _rec = new Map<TapPlace, string>();

  readonly rec$ = new Subject<{ place: TapPlace; name: string }>();

  constructor() {
    this._setTaps();
  }

  getRec(place: TapPlace): string {
    const name = this._rec.get(place);
    if (!name) throw new Error(`Tap name is ${name}`);
    return name;
  }

  getTaps(key: string | undefined): Tap[] {
    if (!key) throw new Error(`Key is ${key}`);
    const taps = this._taps.get(key);
    if (!taps) throw new Error(`Taps are ${taps}`);
    return taps;
  }

  getTap(place: TapPlace, name: TapName): Tap {
    const tap = this.getTaps(place).find((tap) => tap.name === name);
    if (!tap) throw new Error(`Tap is ${tap}`);
    return tap;
  }

  getToolbarTap(name: TapName): Tap {
    return this.getTap(TapPlace.Toolbar, name);
  }

  private _setTaps(): void {
    this._taps.set(TapPlace.Actions, [
      this._action(ActionTapName.Send, this._state('visible', 'send', true), {
        confirm: true,
      }),
      this._action(ActionTapName.Edit, this._state('visible', 'edit', true), {
        confirm: true,
        navigation: true,
      }),
      this._action(
        ActionTapName.Delete,
        this._state('visible', 'delete', true),
        {
          confirm: true,
        }
      ),
      this._action(
        ActionTapName.Confirm,
        this._state('hidden', 'task_alt', false)
      ),
      this._action(
        ActionTapName.Cancel,
        this._state('hidden', 'cancel', false)
      ),
      this._action(ActionTapName.Create, this._state('visible', 'add', false), {
        navigation: true,
      }),
    ]);
    this._taps.set(TapPlace.Pages, [
      this._page(PageTapName.Matrices, this._state('visible', 'home', false), {
        navigation: true,
      })
    ]);
    this._taps.set(TapPlace.Settings, []);
    this._taps.set(TapPlace.Toolbar, [
      this._toolbar(
        ToolbarTapName.Settings,
        this._state('visible', 'settings', false),
        {
          navigation: true,
        }
      ),
      this._toolbar(
        ToolbarTapName.Pages,
        this._state('visible', 'apps', false),
        {
          navigation: true,
        }
      ),
      this._toolbar(
        ToolbarTapName.Actions,
        this._state('visible', 'filter_list', false),
        {
          navigation: true,
        }
      ),
    ]);
  }

  private _action(
    name: TapName,
    initState: TapState,
    options?: TapOptions
  ): Tap {
    return this._tap(name, TapPlace.Actions, initState, options);
  }

  private _page(name: string, initState: TapState, options?: TapOptions): Tap {
    return this._tap(name, TapPlace.Pages, initState, options);
  }

  private _toolbar(
    name: TapName,
    initState: TapState,
    options?: TapOptions
  ): Tap {
    return this._tap(name, TapPlace.Toolbar, initState, options);
  }

  private _tap = (
    name: string,
    place: TapPlace,
    initState: TapState,
    options?: TapOptions
  ): Tap => {
    return {
      name,
      place,
      signal: signal(initState),
      options,

      url: () => {
        const first = this.getRec(TapPlace.Pages);
        return place === TapPlace.Pages
          ? [first]
          : [first, { [RouteParam.Second]: name }];
      },

      update(value: Partial<TapState>) {
        this.signal.update((state) => ({ ...state, ...value }));
      },

      reset() {
        this.signal.set(initState);
      },

      restore(key) {
        this.signal.update((state) => ({ ...state, [key]: initState[key] }));
      },

      rec: () => {
        this.rec$.next({ place, name });
        this._rec.set(place, name);
      },

      click() {
        this.rec();
      },
    };
  };

  private _state(
    visibility: Visibility,
    icon: IconName,
    disabled: boolean
  ): TapState {
    return {
      visibility,
      icon,
      disabled,
    };
  }
}

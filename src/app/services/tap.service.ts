import { Injectable, signal } from '@angular/core';
import {
  Tap,
  ActionTapName,
  TapName,
  TapOptions,
  PageTapName,
  TapPlace,
  TapState,
  ToolbarTapName,
  RouteParam,
  TapBuilder,
} from '@types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  readonly taps = new Map<string, Tap[]>();
  readonly rec = new Map<string, string>();
  readonly rec$ = new Subject<{ place: string; name: string }>();

  constructor() {
    this.setTaps();
  }

  getRec(place: TapPlace): string {
    const name = this.rec.get(place);
    if (!name) throw new Error(`Tap name is ${name}`);
    return name;
  }

  getTaps(key: string | undefined): Tap[] {
    if (!key) throw new Error(`Key is ${key}`);
    const taps = this.taps.get(key);
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

  private setTaps(): void {
    this.taps.set(TapPlace.Actions, [
      this.setActionTap(ActionTapName.Send)
        .setState({ icon: 'send' })
        .setOptions({ confirm: true, navigation: false })
        .build(),
      this.setActionTap(ActionTapName.Edit)
        .setState({ icon: 'edit' })
        .setOptions({ confirm: true })
        .build(),
      this.setActionTap(ActionTapName.Delete)
        .setState({ icon: 'delete', disabled: true })
        .setOptions({ confirm: true })
        .build(),
      this.setActionTap(ActionTapName.Confirm)
        .setState({ icon: 'task_alt', visibility: 'hidden' })
        .setOptions({ navigation: false })
        .build(),
      this.setActionTap(ActionTapName.Cancel)
        .setState({ icon: 'cancel', visibility: 'hidden' })
        .setOptions({ navigation: false })
        .build(),
      this.setActionTap(ActionTapName.Create)
        .setState({ icon: 'add' })
        .build()
    ]);
    this.taps.set(TapPlace.Pages, [
      this.setPageTap(PageTapName.Matrices)
        .setState({ icon: 'home' })
        .build()
    ]);
    this.taps.set(TapPlace.Settings, []);
    this.taps.set(TapPlace.Toolbar, [
      this.setToolbarTap(ToolbarTapName.Settings)
        .setState({ icon: 'settings' })
        .build(),
      this.setToolbarTap(ToolbarTapName.Pages)
        .setState({ icon: 'apps' })
        .build(),
      this.setToolbarTap(ToolbarTapName.Actions)
        .setState({ icon: 'filter_list' })
        .build(),
    ]);
  }

  setActionTap(name: string): TapBuilder {
    return this.tap(name, TapPlace.Actions);
  }

  setPageTap(name: string): TapBuilder {
    return this.tap(name, TapPlace.Pages);
  }

  setToolbarTap(name: TapName): TapBuilder {
    return this.tap(name, TapPlace.Toolbar);
  }

  private tap = (name: string, place: string): TapBuilder => {
    const defaultState: TapState = { icon: 'apps', visibility: 'visible', disabled: false };
    const defaultOptions: TapOptions = { confirm: false, navigation: true };
    const tap: Tap = {
      name,
      place,
      signal: signal(defaultState),
      options: defaultOptions,
      url: (): (string | object)[] => {
        const first = this.getRec(TapPlace.Pages);
        return place === TapPlace.Pages
          ? [first]
          : [first, { [RouteParam.Second]: name }];
      },

      update(value: Partial<TapState>): void {
        this.signal.update((state) => ({ ...state, ...value }));
      },

      reset(): void {
        this.signal.set(defaultState);
      },

      restore(key): void {
        this.signal.update((state) => ({ ...state, [key]: defaultState[key] }));
      },

      rec: (): void => {
        this.rec$.next({ place, name });
        this.rec.set(place, name);
      },

      click(): void {
        this.rec();
      },
    };

    const builder: TapBuilder = {
      setState(state: TapState): TapBuilder {
        tap.signal = signal({...defaultState, ...state});
        return builder;
      },

      setOptions(options: TapOptions): TapBuilder {
        tap.options = {...defaultOptions, ...options};
        return builder;
      },

      build(): Tap {
        return tap;
      }
    };

    return builder;
  };
}
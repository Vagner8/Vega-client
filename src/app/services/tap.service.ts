import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Tap,
  ActionTapName,
  TapName,
  TapOptions,
  PageTapName,
  TapPlace,
  TapState,
  ToolbarTapName,
  TapBuilder,
} from '@types';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  readonly taps = new Map<string, Tap[]>();
  readonly rec = new Map<string, string>();

  constructor(private router: Router, private navigation: NavigationService) {
    this.setTaps();
  }

  getRec(place: TapPlace): string {
    const name = this.rec.get(place);
    if (!name) throw new Error(`Tap name is ${name}`);
    return name;
  }

  getTaps(key: string | undefined) {
    if (!key) throw new Error(`Key is ${key}`);
    const taps = this.taps.get(key);
    if (!taps) throw new Error(`Taps are ${taps}`);
    return taps;
  }

  getTap(place: TapPlace, name: TapName) {
    const tap = this.getTaps(place).find((tap) => tap.name === name);
    if (!tap) throw new Error(`Tap is ${tap}`);
    return tap;
  }

  getToolbarTap(name: TapName) {
    return this.getTap(TapPlace.Toolbar, name);
  }

  private setTaps() {
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
      this.setActionTap(ActionTapName.Create).setState({ icon: 'add' }).build(),
    ]);
    this.taps.set(TapPlace.Pages, [
      this.setPageTap(PageTapName.Matrices).setState({ icon: 'home' }).build(),
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

  setActionTap(name: string) {
    return this.tap(name, TapPlace.Actions);
  }

  setPageTap(name: string) {
    return this.tap(name, TapPlace.Pages);
  }

  setToolbarTap(name: string) {
    return this.tap(name, TapPlace.Toolbar);
  }

  private tap = (name: string, place: string): TapBuilder => {
    let defaultState: TapState = {
      icon: 'apps',
      visibility: 'visible',
      disabled: false,
    };
    let defaultOptions: TapOptions = { confirm: false, navigation: true };
    const tap: Tap = {
      name,
      place,
      signal: signal(defaultState),
      options: defaultOptions,

      url(address) {
        return this.place === TapPlace.Pages
          ? [this.name]
          : [address.page, this.name];
      },

      navigate: () => {
        if (!tap.options?.navigation) return;
        this.router.navigate(tap.url(this.navigation.address()));
      },

      update(value: Partial<TapState>) {
        this.signal.update((state) => ({ ...state, ...value }));
      },

      reset() {
        this.signal.set(defaultState);
      },

      restore(key) {
        this.signal.update((state) => ({ ...state, [key]: defaultState[key] }));
      },

      rec: () => {
        this.rec.set(place, name);
      },
    };

    const builder: TapBuilder = {
      setState(state: TapState) {
        defaultState = { ...defaultState, ...state };
        tap.signal = signal(defaultState);
        return builder;
      },

      setOptions(options: TapOptions) {
        tap.options = defaultOptions = { ...defaultOptions, ...options };
        return builder;
      },

      build() {
        return tap;
      },
    };

    return builder;
  };
}

import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  TapActives,
  Tap,
  TapAction,
  TapActionConfig,
  TapLocation,
  TapOptions,
  TapPage,
  TapPageConfig,
  TapProps,
  TapSetting,
  TapSettingConfig,
  TapSignals,
  TapState,
  TapToolbar,
  TapToolbarConfig,
  TapActive,
} from '@types';
import { actions, pages, setSignals, settings, toolbars } from '@utils';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  active$ = new BehaviorSubject<TapActive[] | null>(null);

  actives: TapActives;
  toolbars: TapToolbar[];

  constructor(
    private ss: StateService,
    private router: Router,
  ) {
    this.actives = {
      pages: pages.map(this.page),
      actions: actions.map(this.acton),
      settings: settings.map(this.setting),
    };
    this.toolbars = toolbars.map(this.toolbar);
  }

  toolbar = ({ name, props }: TapToolbarConfig): TapToolbar => {
    const tap = this.create('pages', props);
    return {
      name,
      onClick: () => {
        this.active$.next(this.actives[name]);
      },
      ...tap,
    };
  };

  page = ({ name, props }: TapPageConfig): TapPage => {
    const tap = this.create('pages', props);
    return {
      name,
      onClick: () => {
        this.navigate(name, 'pages');
      },
      ...tap,
    };
  };

  acton = ({ name, props }: TapActionConfig): TapAction => {
    const tap = this.create('actions', props);
    return {
      name,
      onClick: () => {
        this.navigate(name);
      },
      ...tap,
    };
  };

  setting = ({ name, props }: TapSettingConfig): TapSetting => {
    const tap = this.create('settings', props);
    return {
      name,
      onClick: () => {
        this.navigate(name);
      },
      ...tap,
    };
  };

  private create(location: TapLocation, { state = {}, options = {} }: TapProps): Tap {
    return {
      state: this.state(state),
      options: this.options(options),
      location,
      initialState: this.initialState(state),
      reset() {
        setSignals(this.initialState, this.state);
      },
      resetOne(key: keyof TapState) {
        this.state[key].set(this.initialState[key] as never);
      },
    };
  }

  private navigate(name: string, location?: TapLocation): void {
    this.router.navigate(location ? [name] : [this.ss.page(), name]);
  }

  private state(state: Partial<TapState>): TapSignals {
    const { icon, disabled, visibility } = this.initialState(state);
    return {
      icon: signal(icon),
      disabled: signal(disabled),
      visibility: signal(visibility),
    };
  }

  private options(options: Partial<TapOptions>): TapOptions {
    const { confirm = false, navigate = true } = options;
    return { confirm, navigate };
  }

  private initialState(state: Partial<TapState>): TapState {
    const { icon = 'apps', disabled = false, visibility = 'visible' } = state;
    return { icon, disabled, visibility };
  }
}

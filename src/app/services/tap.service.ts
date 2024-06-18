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
  TapRec,
  TapSetting,
  TapSettingConfig,
  TapSignals,
  TapState,
  TapToolbar,
  TapToolbarConfig,
  TapsRecSignals,
} from '@types';
import { actions, pages, setSignals, settings, toolbars } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  rec: TapsRecSignals;
  performers: TapActives;
  toolbars: TapToolbar[];

  constructor(private router: Router) {
    this.rec = {
      page: signal(null),
      action: signal(null),
      toolbar: signal(null),
    };
    this.performers = {
      pages: pages.map(this.page),
      actions: actions.map(this.acton),
      settings: settings.map(this.setting),
    };
    this.toolbars = toolbars.map(this.toolbar);
  }

  toolbar = ({ name, props }: TapToolbarConfig): TapToolbar => {
    return {
      name,
      onClick() {
        this.rec({ toolbar: this.name });
      },
      ...this.create('toolbar', props),
    };
  };

  page = ({ name, props }: TapPageConfig): TapPage => {
    return {
      name,
      onClick() {
        this.rec({ page: this.name, action: null });
        this.navigate();
      },
      ...this.create('pages', props),
    };
  };

  acton = ({ name, props }: TapActionConfig): TapAction => {
    return {
      name,
      onClick() {
        this.rec({ action: this.name });
        this.navigate();
      },
      ...this.create('actions', props),
    };
  };

  setting = ({ name, props }: TapSettingConfig): TapSetting => {
    return {
      name,
      onClick() {
        this.rec({ action: this.name });
        this.navigate();
      },
      ...this.create('actions', props),
    };
  };

  private create(location: TapLocation, props: TapProps): Tap {
    const { state = {}, options = {} } = props;
    return {
      state: this.state(state),
      options: this.options(options),
      location,
      initialState: this.initialState(state),
      rec: (value: Partial<TapRec>) => {
        setSignals(value, this.rec);
      },
      reset() {
        setSignals(this.initialState, this.state);
      },
      resetOne(key: keyof TapState) {
        this.state[key].set(this.initialState[key] as never);
      },
      navigate: (): void => {
        const { page, action } = this.rec;
        this.router.navigate([page(), action()].filter(Boolean));
      },
    };
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

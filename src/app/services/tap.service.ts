import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { actions, pages, setSignals, settings, toolbars } from '@utils';
import { BehaviorSubject } from 'rxjs';
import { ControlService, StateService } from '@services';
import type * as T from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  active$ = new BehaviorSubject<T.TapActive[] | null>(null);

  actives: T.TapActives;
  toolbars: T.TapToolbar[];

  constructor(
    private ss: StateService,
    private cs: ControlService,
    private router: Router,
  ) {
    this.actives = {
      pages: pages.map(this.page),
      actions: actions.map(this.acton),
      settings: settings.map(this.setting),
    };
    this.toolbars = toolbars.map(this.toolbar);
  }

  toolbar = ({ name, props }: T.TapToolbarConfig): T.TapToolbar => {
    const tap = this.create('pages', props);
    return {
      name,
      onClick: () => this.active$.next(this.actives[name]),
      hasName: (test) => test === name,
      ...tap,
    };
  };

  page = ({ name, props }: T.TapPageConfig): T.TapPage => {
    const tap = this.create('pages', props);
    return {
      name,
      onClick: () => this.navigate(name, 'pages'),
      hasName: (test) => test === name,
      ...tap,
    };
  };

  addPages({ units }: T.UnitDto): void {
    for (const name in units) {
      const icon = this.cs.icon(units[name].controls);
      const page = this.page({ name, props: { state: { icon } } });
      this.actives.pages = [page, ...this.actives.pages];
    }
  }

  acton = ({ name, props }: T.TapActionConfig): T.TapAction => {
    const tap = this.create('actions', props);
    return {
      name,
      onClick: () => this.navigate(name),
      hasName: (test) => test === name,
      ...tap,
    };
  };

  setting = ({ name, props }: T.TapSettingConfig): T.TapSetting => {
    const tap = this.create('settings', props);
    return {
      name,
      onClick: () => this.navigate(name),
      hasName: (test) => test === name,
      ...tap,
    };
  };

  private create(location: T.TapLocation, { state = {}, options = {} }: T.TapProps): T.Tap {
    return {
      state: this.state(state),
      options: this.options(options),
      location,
      initialState: this.initialState(state),
      reset() {
        setSignals(this.initialState, this.state);
      },
      resetOne(key) {
        this.state[key].set(this.initialState[key] as never);
      },
    };
  }

  private navigate(name: string, location?: T.TapLocation): void {
    this.router.navigate(location ? [name] : [this.ss.page(), name]);
  }

  private state(state: Partial<T.TapState>): T.TapSignals {
    const { icon, disabled, visibility } = this.initialState(state);
    return {
      icon: signal(icon),
      disabled: signal(disabled),
      visibility: signal(visibility),
    };
  }

  private options(options: Partial<T.TapOptions>): T.TapOptions {
    const { confirm = false, navigate = true } = options;
    return { confirm, navigate };
  }

  private initialState(state: Partial<T.TapState>): T.TapState {
    const { icon = 'apps', disabled = false, visibility = 'visible' } = state;
    return { icon, disabled, visibility };
  }
}

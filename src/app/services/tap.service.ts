import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { actions, pages, setSignals, settings, manager } from '@utils';
import { BehaviorSubject } from 'rxjs';
import { ControlService, StateService } from '@services';
import type * as T from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapService {
  active$ = new BehaviorSubject<T.TapActive[] | null>(null);

  pages: T.TapPage[];
  actions: T.TapAction[];
  settings: T.TapSetting[];
  manager: T.TapManager;

  constructor(
    private ss: StateService,
    private cs: ControlService,
    private router: Router,
  ) {
    this.pages = pages.map(this.setPages);
    this.actions = actions.map(this.setActions);
    this.settings = settings.map(this.setSettings);
    this.manager = this.setManager(manager);
  }

  setManager = ({ name, props }: T.TapToolbarConfig): T.TapManager => {
    const tap = this.create('manager', props);
    return {
      name,
      hasName: (test) => test === name,
      onClick: () => {
        this.active$.next(this.pages);
        this.ss.sidenav.set(true);
      },
      onHoldClick: () => {
        this.active$.next(this.settings);
        this.ss.sidenav.set(true);
      },
      onDoubleClick: () => {
        this.ss.sidenav.set(false);
      },
      ...tap,
    };
  };

  setPages = ({ name, props }: T.TapPageConfig): T.TapPage => {
    const tap = this.create('pages', props);
    return {
      name,
      hasName: (test) => test === name,
      onClick: () => this.navigate(name, 'pages'),
      onHoldClick() {},
      onDoubleClick() {},
      ...tap,
    };
  };

  addPages({ units }: T.UnitDto): void {
    for (const name in units) {
      const icon = this.cs.icon(units[name].controls);
      const page = this.setPages({ name, props: { state: { icon } } });
      this.pages = [page, ...this.pages];
    }
  }

  setActions = ({ name, props }: T.TapActionConfig): T.TapAction => {
    const tap = this.create('actions', props);
    return {
      name,
      hasName: (test) => test === name,
      onClick: () => this.navigate(name),
      onHoldClick() {},
      onDoubleClick() {},
      ...tap,
    };
  };

  setSettings = ({ name, props }: T.TapSettingConfig): T.TapSetting => {
    const tap = this.create('settings', props);
    return {
      name,
      hasName: (test) => test === name,
      onClick: () => this.navigate(name),
      onHoldClick() {},
      onDoubleClick() {},
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

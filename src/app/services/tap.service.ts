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
  executors$ = new BehaviorSubject<T.TapExecutor[] | null>(null);

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
    const tap = this.create(name, 'manager', props);
    return {
      ...tap,
      onClick: () => {
        this.executors$.next(this.pages);
        this.ss.sidenav.set('open');
      },
      onHoldClick: () => {
        this.executors$.next(this.settings);
        this.ss.sidenav.set('open');
      },
      onDoubleClick: () => {
        this.ss.sidenav.set('close');
      },
    };
  };

  setPages = ({ name, props }: T.TapPageConfig): T.TapPage => {
    const tap = this.create(name, 'pages', props);
    return {
      ...tap,
      onClick: () => {
        this.navigate(name, 'pages');
      },
      onHoldClick() {},
      onDoubleClick() {},
    };
  };

  addPages({ fractals }: T.FractalDto): void {
    for (const name in fractals) {
      const icon = this.cs.icon(fractals[name].controls);
      const page = this.setPages({ name, props: { state: { icon } } });
      this.pages = [page, ...this.pages];
    }
  }

  setActions = ({ name, props }: T.TapActionConfig): T.TapAction => {
    const tap = this.create<T.TapActionNames>(name, 'actions', props);
    return {
      ...tap,
      onClick: () => this.navigate(name),
      onHoldClick() {},
      onDoubleClick() {},
    };
  };

  setSettings = ({ name, props }: T.TapSettingConfig): T.TapSetting => {
    const tap = this.create<T.TapSettingNames>(name, 'settings', props);
    return {
      ...tap,
      onClick: () => this.navigate(name),
      onHoldClick() {},
      onDoubleClick() {},
    };
  };

  private create<N>(
    name: N,
    location: T.TapLocation,
    { state = {}, options = {} }: T.TapProps,
  ): T.Tap<N> {
    return {
      name,
      state: this.state(state),
      options: this.options(options),
      location,
      initialState: this.initialState(state),
      hasName: (test) => test === name,

      reset() {
        setSignals(this.initialState, this.state);
      },
      resetOne(key) {
        this.state[key].set(this.initialState[key] as never);
      },

      onClick() {},
      onHoldClick() {},
      onDoubleClick() {},
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

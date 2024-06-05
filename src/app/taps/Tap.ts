import { signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  TapType,
  TapInitialState,
  TapOptions,
  TapPlaces,
  TapInitialProps,
  TapState,
  hasProperty,
  RecTap,
  TapServiceProps,
  PathTap,
} from '@types';

export abstract class Tap implements TapType {
  abstract place: TapPlaces;
  abstract onClick(): void;

  rec: RecTap;
  router: Router;
  path: PathTap;
  state: TapState = {
    icon: signal('apps'),
    disabled: signal(false),
    visibility: signal('visible'),
  };
  options: TapOptions = { confirm: false };

  constructor(public props: TapInitialProps & TapServiceProps) {
    const { rec, router, path, initialState, initialOptions } = props;
    this.rec = rec;
    this.router = router;
    this.path = path;
    this.setState(initialState);
    this.setOptions(initialOptions);
  }

  setState(state?: TapInitialState): void {
    if (!state) return;
    Object.entries(state).forEach(([k, v]) => {
      if (!hasProperty(this.state, k)) return;
      this.state[k].set(v as never);
    });
  }

  reset(): void {
    this.setState(this.props.initialState);
  }

  restore(key: keyof TapState): void {
    if (!this.props.initialState) return;
    this.state[key].set(this.props.initialState[key] as never);
  }

  private setOptions(options?: Partial<TapOptions>): void {
    if (!options) return;
    Object.entries(options).forEach(([k, v]) => {
      if (!hasProperty(this.options, k)) return;
      this.options[k] = v;
    });
  }
}

import { signal } from '@angular/core';
import {
  TapLocation,
  RecTapSignals,
  RecTapValue,
  ITap,
  TapSignals,
  TapStateValue,
  TapOptions,
  TapServices,
  TapProps,
} from '@types';
import { setSignals } from '@utils';

export abstract class Tap implements ITap {
  abstract location: TapLocation;
  abstract onClick(): void;

  private _state: TapSignals;
  private _initialState: TapStateValue;
  private _options: TapOptions;
  private _services: TapServices;

  constructor({ state, options, services }: TapProps) {
    this._services = services;
    this._options = this.createOptions(options);
    this._initialState = this.createInitialState(state);
    this._state = this.createState();
  }

  setState(value: Partial<TapStateValue>): void {
    setSignals(value, this._state);
  }

  resetState(): void {
    this.setState(this._initialState);
  }

  restoreState(key: keyof TapStateValue): void {
    this._state[key].set(this._initialState[key] as never);
  }

  setRec(value: Partial<RecTapValue>): void {
    setSignals(value, this._services.rec);
  }

  navigate(): void {
    this._services.router.navigate([this.rec.page(), this.rec.action()]);
  }

  get rec(): RecTapSignals {
    return this._services.rec;
  }

  get state(): TapSignals {
    return this._state;
  }

  get options(): TapOptions {
    return this._options;
  }

  private createState(): TapSignals {
    const { icon, disabled, visibility } = this._initialState;
    return {
      icon: signal(icon),
      disabled: signal(disabled),
      visibility: signal(visibility),
    };
  }

  private createInitialState(state?: Partial<TapStateValue>): TapStateValue {
    return {
      icon: 'apps',
      disabled: false,
      visibility: 'visible',
      ...state,
    };
  }

  private createOptions(options?: Partial<TapOptions>): TapOptions {
    return { confirm: false, ...options };
  }
}

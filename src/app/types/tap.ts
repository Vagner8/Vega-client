import { MapWritableSignal, Visibility } from './common';
import { IconName } from './icon';
import { Router } from '@angular/router';

// ActionTap

export type ActionTapNames =
  | 'Add'
  | 'Update'
  | 'Remove'
  | 'Send'
  | 'Confirm'
  | 'Cancel';
export type ActionTaps = ModifierTap<ActionTapNames, IActionTap>;

export interface IActionTap extends ITap {
  name: ActionTapNames;
}

// SettingTap

export type SettingTapNames = 'Setting';
export type SettingTaps = ModifierTap<SettingTapNames, ISettingTap>;

export interface ISettingTap extends ITap {
  name: SettingTapNames;
}

// PageTap

export type PageTaps = ModifierTap<string, IPageTap>;

export interface IPageTap extends ITap {
  name: string;
}

// ToolbarTap

export type ToolbarTapNames = keyof ModifierTaps;
export type ToolbarTaps = ModifierTap<ToolbarTapNames, IToolbarTap>;

export interface IToolbarTap extends ITap {
  name: ToolbarTapNames;
}

// Tap

export type TapSignals = MapWritableSignal<TapStateValue>;

export interface TapOptions {
  confirm: boolean;
}

export interface TapStateValue {
  icon: IconName;
  disabled: boolean;
  visibility: Visibility;
}

export interface TapServices {
  rec: RecTapSignals;
  router: Router;
}

export interface ITap {
  location: TapLocation;
  get rec(): RecTapSignals;
  get state(): TapSignals;
  get options(): TapOptions;
  onClick(): void;
  setState(state: Partial<TapStateValue>): void;
  resetState(): void;
  restoreState(key: keyof TapStateValue): void;
  setRec(value: Partial<RecTapValue>): void;
  navigate(): void;
}

export interface TapProps {
  services: TapServices;
  state?: Partial<TapStateValue>;
  options?: Partial<TapOptions>;
}

// Common

export type TapLocation = ToolbarTapNames | 'toolbar';
export type RecTapSignals = MapWritableSignal<RecTapValue>;

export interface RecTapValue {
  page: string | null;
  action: string | null;
  toolbar: ToolbarTapNames | null;
}

export interface ModifierTap<N extends string, I extends ITap> {
  obj: Record<N, I>;
  arr: I[];
}

export interface ModifierTaps {
  pages: PageTaps;
  actions: ActionTaps;
  settings: SettingTaps;
}

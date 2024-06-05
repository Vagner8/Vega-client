import { Signal, WritableSignal } from '@angular/core';
import { MapWritableSignal, Visibility } from './common';
import { IconName } from './icon';
import { ActionTap, PageTap, SettingTap, ToolbarTap } from '@taps';
import { Router } from '@angular/router';

export type TapType = TapInitialProps & TapFields & TapMethods;
export type TapState = MapWritableSignal<TapBaseState>;
export type TapPlaces = keyof DrawerTaps | 'toolbar';
export type TapInitialState = Partial<TapBaseState>;

export interface PathTap {
  page: Signal<string | null>;
  action: Signal<string | null>;
}

export interface RecTap {
  pages: WritableSignal<string | null>;
  actions: WritableSignal<string | null>;
  toolbar: WritableSignal<keyof DrawerTaps | null>;
  settings: WritableSignal<string | null>;
}

export interface DrawerTaps {
  pages: PageTaps;
  actions: ActionTaps;
  settings: SettingTaps;
}

export interface TapBaseState {
  icon: IconName;
  disabled: boolean;
  visibility: Visibility;
}

export interface TapOptions {
  confirm: boolean;
}

export interface TapFields {
  state: TapState;
  place: TapPlaces;
  options: TapOptions;
}

export interface TapMethods {
  reset(): void;
  onClick(): void;
  restore(key: keyof TapState): void;
  setState(state?: TapInitialState): void;
}

// Props

export interface TapServiceProps {
  rec: RecTap;
  path: PathTap;
  router: Router;
}

export interface TapInitialProps {
  initialState?: TapInitialState;
  initialOptions?: Partial<TapOptions>;
}

// ToolbarTaps

export type ToolbarObjectTaps = Record<keyof DrawerTaps, ToolbarTap>;
export type ToolbarTapNames = keyof ToolbarTaps['obj'];

export type ToolbarTaps = {
  obj: ToolbarObjectTaps
  arr: ToolbarTap[];
}

export interface ToolbarTapOwnProps {
  name: ToolbarTapNames
}

export type ToolbarTapProps = ToolbarTapOwnProps &
  TapInitialProps &
  TapServiceProps;

// PageTaps

export interface PageObjectTaps {
  [key: string]: PageTap;
}

export interface PageTaps {
  obj: PageObjectTaps;
  arr: PageTap[];
}

export interface PageTapOwnProps {
  name: string;
}

export type PageTapProps = PageTapOwnProps & TapInitialProps & TapServiceProps;

// ActionTaps

export type ActionTapNames = keyof ActionObjectTaps;

export interface ActionObjectTaps {
  Add: ActionTap;
  Update: ActionTap;
  Remove: ActionTap;
  Send: ActionTap;
  Confirm: ActionTap;
  Cancel: ActionTap;
}

export interface ActionTaps {
  obj: ActionObjectTaps;
  arr: ActionTap[];
}

export interface ActionTapOwnProps {
  name: ActionTapNames;
}

export type ActionTapProps = ActionTapOwnProps &
  TapInitialProps &
  TapServiceProps;

// SettingTaps

export type SettingTapNames = keyof SettingObjectTaps;

export interface SettingObjectTaps {
  Setting: SettingTap;
}

export interface SettingTaps {
  obj: SettingObjectTaps;
  arr: SettingTap[]
}

export interface SettingTapOwnProps {
  name: SettingTapNames;
}

export type SettingTapProps = SettingTapOwnProps &
  TapInitialProps &
  TapServiceProps;

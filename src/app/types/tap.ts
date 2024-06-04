import { WritableSignal } from '@angular/core';
import { Address, MapWritableSignal, Visibility } from './common';
import { IconName } from './icon';
import { ActionTap, PageTap, SettingTap, ToolbarTap } from '@taps';
import { Router } from '@angular/router';

export type TapRec = Record<TapPlaces, WritableSignal<string | null>>;
export type TapType = TapProps & TapFields & TapMethods;
export type TapState = MapWritableSignal<TapBaseState>;
export type TapPlaces = keyof Taps;
export type TapInitialState = Partial<TapBaseState>;

export enum ActionTapName {
  Add = 'Add',
  Update = 'Update',
  Remove = 'Remove',
  Send = 'Send',
  Confirm = 'Confirm',
  Cancel = 'Cancel',
}

export enum ToolbarTapName {
  settings = 'settings',
  pages = 'pages',
  actions = 'actions',
}

export interface Taps {
  pages: PageTap[];
  actions: ActionTap[];
  toolbar: ToolbarTap[];
  settings: SettingTap[];
}

export interface TapBaseState {
  icon: IconName;
  disabled: boolean;
  visibility: Visibility;
}

export interface TapOptions {
  confirm: boolean;
  navigation: boolean;
}

export interface TapServiceProps {
  rec: TapRec;
  router: Router;
  address: Address;
}

export interface TapProps {
  name: string;
  initialState?: TapInitialState;
  initialOptions?: Partial<TapOptions>;
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

import { WritableSignal } from '@angular/core';
import { Visibility } from './common.types';
import { IconName } from './icon.types';

export enum PageTypeName {
  Matrices = 'Matrices',
}

export enum ActionTapName {
  Add = 'Add',
  Update = 'Update',
  Remove = 'Remove',
  Send = 'Send',
  Confirm = 'Confirm',
  Cancel = 'Cancel',
}

export enum ToolbarTapName {
  Settings = 'Settings',
  Pages = 'Pages',
  Actions = 'Actions',
}

export interface Taps {
  Settings: Tap[];
  Pages: Tap[];
  Actions: Tap[];
  Toolbar: Tap[];
}

export interface TapState {
  icon: IconName;
  visibility: Visibility;
  disabled: boolean;
}

export interface Tap {
  name: string;
  place: keyof Taps;
  signal: WritableSignal<TapState>;
  navigate(): void;
  update(value: Partial<TapState>): void;
  restore(key: keyof TapState): void;
  reset(): void;
  options: TapOptions;
}

export interface TapOptions {
  confirm: boolean;
  navigation: boolean;
}

export interface TapBuilder {
  setState(state: TapState): TapBuilder;
  setOptions(options: TapOptions): TapBuilder;
  build(): Tap;
}

export interface TapBaseProps {
  name: string;
  state?: Partial<TapState>;
  options?: Partial<TapOptions>;
}

export interface TapProps extends TapBaseProps {
  place: keyof Taps;
}
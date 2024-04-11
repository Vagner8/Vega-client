import { WritableSignal } from '@angular/core';
import { Address, Visibility } from './common.types';
import { IconName } from './icon.types';

export enum ActionTapName {
  Create = 'Create',
  Edit = 'Edit',
  Delete = 'Delete',
  Send = 'Send',
  Confirm = 'Confirm',
  Cancel = 'Cancel',
}

export enum PageTapName {
  Matrices = 'Matrices',
}

export enum ToolbarTapName {
  Settings = 'Settings',
  Pages = 'Pages',
  Actions = 'Actions',
}

export type TapName = ActionTapName | PageTapName | ToolbarTapName;

export enum TapPlace {
  Actions = 'Actions',
  Pages = 'Pages',
  Settings = 'Settings',
  Toolbar = 'Toolbar',
}

export enum TapPlaces {
  Actions = 'Actions',
  Pages = 'Pages',
  Settings = 'Settings',
  Toolbar = 'Toolbar',
}

export interface TapState {
  icon: IconName;
  visibility?: Visibility;
  disabled?: boolean;
}

export interface Tap {
  name: string;
  place: string;
  signal: WritableSignal<TapState>;
  url(address: Address): string[];
  navigate(): void;
  update(value: Partial<TapState>): void;
  restore(key: keyof TapState): void;
  reset(): void;
  rec(): void;
  options?: TapOptions;
}

export interface TapOptions {
  confirm?: boolean;
  navigation?: boolean;
}

export interface TapBuilder {
  setState(state: TapState): TapBuilder;
  setOptions(options: TapOptions): TapBuilder;
  build(): Tap;
}

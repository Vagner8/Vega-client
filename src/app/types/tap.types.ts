import { WritableSignal } from '@angular/core';
import { Visibility } from './common.types';
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
  Matrices = 'Matrices'
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
  visibility: Visibility;
  disabled: boolean;
}

export interface Tap {
  name: string;
  place: TapPlace;
  signal: WritableSignal<TapState>;
  url(): (string | object)[];
  update(value: Partial<TapState>): void;
  restore(key: keyof TapState): void;
  reset(): void;
  rec(): void;
  click(): void;
  options?: TapOptions;
}

export interface TapOptions {
  confirm?: boolean;
  navigation?: boolean;
}
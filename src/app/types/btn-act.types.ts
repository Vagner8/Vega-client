import { WritableSignal } from '@angular/core';
import { Visibility } from './common.types';
import { IconName } from './icon.types';

export interface BtnActState {
  icon: IconName;
  visibility: Visibility;
  confirm: boolean;
  link: boolean;
  disabled: boolean;
}

export type BtnActName =
  | ActiveBtnActName
  | NavigationBtnActName
  | SettingsBtnActName
  | ToolbarBtnActName;

export enum BtnActType {
  Active = 'Active',
  Navigation = 'Navigation',
  Settings = 'Settings',
  Toolbar = 'Toolbar',
}

export enum ToolbarBtnActName {
  Active = 'Active',
  Navigation = 'Navigation',
  Settings = 'Settings',
}

export enum ActiveBtnActName {
  Create = 'Create',
  Edit = 'Edit',
  Delete = 'Delete',
  Send = 'Send',
  Confirm = 'Confirm',
  Cancel = 'Cancel',
}

export enum NavigationBtnActName {
  Home = 'Home',
  Users = 'Users',
}

export enum SettingsBtnActName {}

export interface BtnAct {
  type: BtnActType;
  name: BtnActName;
  signal: WritableSignal<BtnActState>;
}

export interface BtnActGroup {
  [key: string]: BtnAct[];
}

export type BtnRec = WritableSignal<{
  type: BtnActType;
  name: BtnActName;
} | null>;

export interface BtnRecGroup {
  [key: string]: BtnRec;
}

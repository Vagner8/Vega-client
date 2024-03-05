import { WritableSignal } from '@angular/core';
import { Visibility } from './common.types';
import { IconName } from './icon.types';

export interface BtnState {
  icon: IconName;
  visibility: Visibility;
  confirm: boolean;
  navigate: boolean;
  disabled: boolean;
}

export type ToolbarBtnName = BtnType;

export type ActiveBtnName =
  | 'Create'
  | 'Edit'
  | 'Delete'
  | 'Send'
  | 'Confirm'
  | 'Cancel';

export type NavigationBtnName = 'Home' | 'Users';

export interface Btn {
  type: BtnType;
  name: BtnName;
  signal: WritableSignal<BtnState>;
  update(value: Partial<BtnState>): void;
  reset(key: keyof BtnState): void;
  rec(): void;
}

export type BtnType = 'active' | 'navigation' | 'settings' | 'toolbar';

export type BtnGroup = Record<BtnType, Btn[]>

export type BtnName = ActiveBtnName | NavigationBtnName | ToolbarBtnName;

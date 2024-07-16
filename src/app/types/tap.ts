import { IconName } from '@types';

export type TapLocation = 'Settings' | 'Pages' | 'Actions';
export type TapPagesNames = 'Home' | 'Users' | 'Products';
export type TapActionsNames = 'Add' | 'Delete' | 'Save';
export type TapSettingsNames = 'Settings';
export type TapNames = TapPagesNames | TapActionsNames | TapSettingsNames;

export interface TapInfo {
  name: TapNames;
  event: Event;
}

export interface TapConfig {
  icon: IconName;
  name: TapNames;
  navigation?: boolean;
}

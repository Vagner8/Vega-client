import { IconName } from '@types';

export type TapLocation = 'Pages' | 'Actions' | 'Settings';
export type TapNames =
  | 'Manager'
  | 'Add'
  | 'Update'
  | 'Remove'
  | 'Send'
  | 'Confirm'
  | 'Cancel'
  | 'Home'
  | 'Setting';

export interface TapInfo {
  name: TapNames;
  event: Event;
}

export interface TapConfig {
  icon: IconName;
  name: TapNames;
  navigation?: boolean;
}

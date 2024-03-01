import { IconName } from './icon.types';

export interface DrawerAction {
  name: ActionName;
  icon: IconName;
  option?: Partial<{ confirm: boolean; disabled: boolean }>;
}

export interface DrawerActions {
  actions: DrawerAction[];
  pages: DrawerAction[];
  settings: DrawerAction[];
}

export enum ActionName {
  Home = 'Home',
  Users = 'Users',
  Create = 'Create',
  Edit = 'Edit',
  Delete = 'Delete',
  Modal = 'modal',
  Send = 'Send',
  Confirm = 'Confirm',
  Cancel = 'Cancel'
}

export type CurrentDrawerAction = keyof DrawerActions | null;

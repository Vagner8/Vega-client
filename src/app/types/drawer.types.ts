import { IconName } from './icon.types';

export interface DrawerTrigger {
  name: TriggerName;
  icon: IconName;
}

export interface DrawerTriggers {
  actions: DrawerTrigger[];
  pages: DrawerTrigger[];
  settings: DrawerTrigger[];
}

export enum TriggerName {
  Home = 'Home',
  Users = 'Users',
  Create = 'Create',
  Edit = 'Edit',
  Delete = 'Delete',
}
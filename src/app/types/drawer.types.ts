import { IconName } from './icon.types';
import { PagePath } from './routing.types';

export interface DrawerTrigger {
  label: string;
  iconName: IconName;
  pagePath?: PagePath;
}

export interface DrawerTriggers {
  actions: DrawerTrigger[];
  pages: DrawerTrigger[];
  settings: DrawerTrigger[];
}
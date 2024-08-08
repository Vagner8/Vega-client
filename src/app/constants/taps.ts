import { TapConfigModifier, TapConfigPage, TapConfigSetting } from '@types';

export const PAGE_TAPS: TapConfigPage[] = [
  {
    name: 'Home',
    icon: 'home',
    type: 'Page',
  },
];

export const MODIFIER_TAPS: TapConfigModifier[] = [
  {
    name: 'Delete',
    icon: 'delete',
    type: 'Modifier',
  },
  {
    name: 'Save',
    icon: 'save',
    type: 'Modifier',
  },
  {
    name: 'Add',
    icon: 'add_circle',
    type: 'Modifier',
  },
  {
    name: 'Edit',
    icon: 'edit',
    type: 'Modifier',
  },
];

export const SETTINGS_TAPS: TapConfigSetting[] = [
  {
    name: 'Settings',
    icon: 'settings',
    type: 'Setting',
  },
];

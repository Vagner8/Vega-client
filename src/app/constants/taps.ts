import { TapConfigModifier, TapConfigPage, TapConfigSetting } from '@types';

export const PAGE_TAPS: TapConfigPage[] = [
  {
    name: 'Home',
    icon: 'home',
    type: 'pages',
  },
];

export const MODIFIER_TAPS: TapConfigModifier[] = [
  {
    name: 'Delete',
    icon: 'delete',
    type: 'modifiers',
  },
  {
    name: 'Save',
    icon: 'save',
    type: 'modifiers',
  },
  {
    name: 'Add',
    icon: 'add_circle',
    type: 'modifiers',
  },
  {
    name: 'Edit',
    icon: 'edit',
    type: 'modifiers',
  },
];

export const SETTINGS_TAPS: TapConfigSetting[] = [
  {
    name: 'Settings',
    icon: 'settings',
    type: 'settings',
  },
];

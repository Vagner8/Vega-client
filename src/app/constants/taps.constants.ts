import { TapConfigModifier, TapConfigPage, TapConfigSetting } from '@types';

interface Taps {
  PAGES: TapConfigPage[];
  MODIFIERS: TapConfigModifier[];
  SETTINGS: TapConfigSetting[];
}

export const TAPS: Taps = {
  PAGES: [
    {
      name: 'Home',
      icon: 'home',
      type: 'pages',
    },
  ],

  MODIFIERS: [
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
  ],

  SETTINGS: [
    {
      name: 'Settings',
      icon: 'settings',
      type: 'settings',
    },
  ],
};

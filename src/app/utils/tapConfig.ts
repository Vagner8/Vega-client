import { TapConfig, TapLocation } from '@types';

export const taps: Record<Exclude<TapLocation, 'Toolbar'>, TapConfig[]> = {
  Pages: [
    {
      name: 'Home',
      icon: 'home',
      navigation: true,
    },
  ],
  Actions: [
    {
      name: 'Send',
      icon: 'send',
    },
    {
      name: 'Update',
      icon: 'edit',
    },
    {
      name: 'Remove',
      icon: 'delete',
    },
    {
      name: 'Confirm',
      icon: 'task_alt',
    },
    {
      name: 'Cancel',
      icon: 'cancel',
    },
    {
      name: 'Add',
      icon: 'add',
    },
  ],
  Settings: [
    {
      name: 'Setting',
      icon: 'settings',
    },
  ],
};

import { TapActionConfig, TapPageConfig, TapSettingConfig, TapToolbarConfig } from '@types';

export const manager: TapToolbarConfig = {
  name: 'manager',
  props: {
    state: { icon: 'apps', disabled: true },
  },
};

export const actions: TapActionConfig[] = [
  {
    name: 'Send',
    props: {
      state: { icon: 'send' },
      options: { confirm: true },
    },
  },
  {
    name: 'Update',
    props: {
      state: { icon: 'edit' },
      options: { confirm: true },
    },
  },
  {
    name: 'Remove',
    props: {
      state: { icon: 'delete', disabled: true },
      options: { confirm: true },
    },
  },
  {
    name: 'Confirm',
    props: {
      state: { icon: 'task_alt', visibility: 'hidden' },
    },
  },
  {
    name: 'Cancel',
    props: {
      state: { icon: 'cancel', visibility: 'hidden' },
    },
  },
  {
    name: 'Add',
    props: {
      state: { icon: 'add' },
    },
  },
];

export const settings: TapSettingConfig[] = [
  {
    name: 'Setting',
    props: {
      state: { icon: 'settings' },
    },
  },
];

export const pages: TapPageConfig[] = [
  {
    name: 'Home',
    props: {
      state: { icon: 'home' },
    },
  },
];

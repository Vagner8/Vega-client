import { TapActionConfig, TapPageConfig, TapSettingConfig, TapToolbarConfig } from '@types';

export const toolbars: TapToolbarConfig[] = [
  {
    name: 'settings',
    props: {
      state: { icon: 'settings', disabled: true },
    },
  },
  {
    name: 'pages',
    props: {
      state: { icon: 'apps' },
    },
  },
  {
    name: 'actions',
    props: {
      state: { icon: 'filter_list', disabled: true },
    },
  },
];

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
    name: 'Group',
    props: {
      state: { icon: 'apps' },
    },
  },
  {
    name: 'Home',
    props: {
      state: { icon: 'home' },
    },
  },
];

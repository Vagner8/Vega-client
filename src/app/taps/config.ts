import { ActionTaps, ModifierTaps, PageTaps, SettingTaps, TapServices, ToolbarTaps } from '@types';
import { ToolbarTap } from './ToolbarTap';
import { PageTap } from './PageTap';
import { ActionTap } from './ActionTap';
import { SettingTap } from './SettingTap';

const pageTaps = (services: TapServices): PageTaps => {
  const obj = {
    Groups: new PageTap('Group', { services }),
  };
  return { obj, list: Object.values(obj) };
};

const actionTaps = (services: TapServices): ActionTaps => {
  const obj = {
    Send: new ActionTap('Send', {
      state: { icon: 'send' },
      options: { confirm: true },
      services,
    }),
    Update: new ActionTap('Update', {
      state: { icon: 'edit' },
      options: { confirm: true },
      services,
    }),
    Remove: new ActionTap('Remove', {
      state: { icon: 'delete', disabled: true },
      options: { confirm: true },
      services,
    }),
    Confirm: new ActionTap('Confirm', {
      state: { icon: 'task_alt', visibility: 'hidden' },
      services,
    }),
    Cancel: new ActionTap('Cancel', {
      state: { icon: 'cancel', visibility: 'hidden' },
      services,
    }),
    Add: new ActionTap('Add', {
      state: { icon: 'add' },
      services,
    }),
  };
  return { obj, list: Object.values(obj) };
};

const settingTaps = (services: TapServices): SettingTaps => {
  const obj = {
    Setting: new SettingTap('Setting', { services }),
  };
  return { obj, list: Object.values(obj) };
};

export const createModifierTaps = (services: TapServices): ModifierTaps => {
  return {
    pages: pageTaps(services),
    actions: actionTaps(services),
    settings: settingTaps(services),
  };
};

export const createToolbarTaps = (services: TapServices): ToolbarTaps => {
  const obj = {
    settings: new ToolbarTap('settings', {
      state: { icon: 'settings', disabled: true },
      services,
    }),
    pages: new ToolbarTap('pages', {
      state: { icon: 'apps' },
      services,
    }),
    actions: new ToolbarTap('actions', {
      state: { icon: 'filter_list', disabled: true },
      services,
    }),
  };
  return { obj, list: Object.values(obj) };
};

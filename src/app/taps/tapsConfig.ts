import {
  ActionTaps,
  DrawerTaps,
  PageTaps,
  SettingTaps,
  TapServiceProps,
  ToolbarTaps,
} from '@types';
import { ToolbarTap } from './ToolbarTap';
import { PageTap } from './PageTap';
import { ActionTap } from './ActionTap';
import { SettingTap } from './SettingTap';

const pageTaps = (sp: TapServiceProps): PageTaps => {
  const obj = {
    Groups: new PageTap({ name: 'Groups', ...sp }),
  };
  return { obj, arr: Object.values(obj) };
};

const actionTaps = (sp: TapServiceProps): ActionTaps => {
  const obj = {
    Send: new ActionTap({
      name: 'Send',
      initialState: { icon: 'send' },
      initialOptions: { confirm: true },
      ...sp,
    }),
    Update: new ActionTap({
      name: 'Update',
      initialState: { icon: 'edit' },
      initialOptions: { confirm: true },
      ...sp,
    }),
    Remove: new ActionTap({
      name: 'Remove',
      initialState: { icon: 'delete', disabled: true },
      initialOptions: { confirm: true },
      ...sp,
    }),
    Confirm: new ActionTap({
      name: 'Confirm',
      initialState: { icon: 'task_alt', visibility: 'hidden' },
      ...sp,
    }),
    Cancel: new ActionTap({
      name: 'Cancel',
      initialState: { icon: 'cancel', visibility: 'hidden' },
      ...sp,
    }),
    Add: new ActionTap({
      name: 'Add',
      initialState: { icon: 'add' },
      ...sp,
    }),
  };
  return { obj, arr: Object.values(obj) };
};

const settingTaps = (sp: TapServiceProps): SettingTaps => {
  const obj = {
    Setting: new SettingTap({ name: 'Setting', ...sp }),
  };
  return { obj, arr: Object.values(obj) };
};

export const drawerTaps = (sp: TapServiceProps): DrawerTaps => {
  return {
    pages: pageTaps(sp),
    actions: actionTaps(sp),
    settings: settingTaps(sp),
  };
};

export const toolbarTaps = (sp: TapServiceProps): ToolbarTaps => {
  const obj = {
    settings: new ToolbarTap({
      name: 'settings',
      initialState: { icon: 'settings', disabled: true },
      ...sp,
    }),
    pages: new ToolbarTap({
      name: 'pages',
      initialState: { icon: 'apps' },
      ...sp,
    }),
    actions: new ToolbarTap({
      name: 'actions',
      initialState: { icon: 'filter_list', disabled: true },
      ...sp,
    }),
  };
  return { obj, arr: Object.values(obj) };
};

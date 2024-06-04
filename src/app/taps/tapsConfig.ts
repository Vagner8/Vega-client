import { ActionTapName, TapProps, ToolbarTapName } from '@types';

export const SettingTaps: TapProps[] = [];
export const PageTaps: TapProps[] = [
  {
    name: 'Group',
  },
];

export const ActionTaps: TapProps[] = [
  {
    name: ActionTapName.Send,
    initialState: { icon: 'send' },
    initialOptions: { confirm: true },
  },
  {
    name: ActionTapName.Update,
    initialState: { icon: 'edit' },
    initialOptions: { confirm: true },
  },
  {
    name: ActionTapName.Remove,
    initialState: { icon: 'delete', disabled: true },
    initialOptions: { confirm: true },
  },
  {
    name: ActionTapName.Confirm,
    initialState: { icon: 'task_alt', visibility: 'hidden' },
  },
  {
    name: ActionTapName.Cancel,
    initialState: { icon: 'cancel', visibility: 'hidden' },
  },
  {
    name: ActionTapName.Add,
    initialState: { icon: 'add' },
  },
];

export const ToolbarTaps: TapProps[] = [
  {
    name: ToolbarTapName.settings,
    initialState: { icon: 'settings' },
    initialOptions: { navigation: false },
  },
  {
    name: ToolbarTapName.pages,
    initialState: { icon: 'apps' },
    initialOptions: { navigation: false },
  },
  {
    name: ToolbarTapName.actions,
    initialState: { icon: 'filter_list' },
    initialOptions: { navigation: false },
  },
];

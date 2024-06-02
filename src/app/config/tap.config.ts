import {
  ActionTapName,
  PageTypeName,
  TapBaseProps,
  Taps,
  ToolbarTapName,
} from '@types';

export const tapDataConfig: Taps = {
  Toolbar: [],
  Pages: [],
  Settings: [],
  Actions: [],
};

export const tapRecConfig: Record<keyof Taps, string> = {
  Toolbar: '',
  Pages: '',
  Settings: '',
  Actions: '',
};

export const tapConfig: Record<keyof Taps, TapBaseProps[]> = {
  Settings: [],
  Pages: [
    {
      name: PageTypeName.Groups,
      state: { icon: 'dataset' },
    },
  ],
  Actions: [
    {
      name: ActionTapName.Send,
      state: { icon: 'send' },
      options: { confirm: true },
    },
    {
      name: ActionTapName.Update,
      state: { icon: 'edit' },
      options: { confirm: true },
    },
    {
      name: ActionTapName.Remove,
      state: { icon: 'delete', disabled: true },
      options: { confirm: true },
    },
    {
      name: ActionTapName.Confirm,
      state: { icon: 'task_alt', visibility: 'hidden' },
    },
    {
      name: ActionTapName.Cancel,
      state: { icon: 'cancel', visibility: 'hidden' },
    },
    {
      name: ActionTapName.Add,
      state: { icon: 'add' },
    },
  ],
  Toolbar: [
    {
      name: ToolbarTapName.Settings,
      state: { icon: 'settings' },
      options: { navigation: false },
    },
    {
      name: ToolbarTapName.Pages,
      state: { icon: 'apps' },
      options: { navigation: false },
    },
    {
      name: ToolbarTapName.Actions,
      state: { icon: 'filter_list' },
      options: { navigation: false },
    },
  ],
};

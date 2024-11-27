export enum InputType {
  Text = 'Text',
  Email = 'Email',
  Password = 'Password',
}

export type Timeout = ReturnType<typeof setTimeout>;

export type IconName =
  | 'add'
  | 'edit'
  | 'delete'
  | 'home'
  | 'group'
  | 'close'
  | 'visibility'
  | 'visibility_off'
  | 'view_cozy'
  | 'task_alt'
  | 'send'
  | 'cancel'
  | 'settings'
  | 'apps'
  | 'filter_list'
  | 'category'
  | 'dataset'
  | 'diversity_2'
  | 'image'
  | 'widgets'
  | 'save'
  | 'add_circle';

import { MODIFIERS, PAGES } from '@constants';
import { IconName } from '@types';

export type TapManagerTypeClick = 1 | 2 | 3;
export type TapModifiersNames = (typeof MODIFIERS)[keyof typeof MODIFIERS];
export type TapsSettingsNames = 'Settings';
export type TapPagesNames = (typeof PAGES)[keyof typeof PAGES];
export type TapsNames = TapPagesNames | TapsSettingsNames | TapModifiersNames;

export type TapTypes = keyof TapConfigs;

export type TapConfigPage = TapConfig<TapPagesNames>;
export type TapConfigSetting = TapConfig<TapsSettingsNames>;
export type TapConfigModifier = TapConfig<TapModifiersNames>;
export type TapConfigUnion = TapConfigPage | TapConfigSetting | TapConfigModifier;

export interface TapConfig<T> {
  name: T;
  icon: IconName;
  type: TapTypes;
  disabled?: boolean;
}

export interface TapConfigs {
  pages: TapConfigPage[];
  modifiers: TapConfigModifier[];
  settings: TapConfigSetting[];
}

import { FractalsNames, IconName } from '@types';

export type TapModifiersNames = 'Add' | 'Delete' | 'Save' | 'Edit';
export type TapsSettingsNames = 'Settings';
export type TapPagesNames = 'Home' | FractalsNames;
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
  Page: TapConfigPage[];
  Modifier: TapConfigModifier[];
  Setting: TapConfigSetting[];
}

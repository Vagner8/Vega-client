import { IconName, MapWritableSignal, Visibility } from '@types';

export type TapManagerName = 'manager';
export type TapActionNames = 'Add' | 'Update' | 'Remove' | 'Send' | 'Confirm' | 'Cancel';
export type TapSettingNames = 'Setting';

export type TapLocation = 'pages' | 'actions' | 'settings' | 'manager';
export type TapActive = TapAction | TapSetting | TapPage;
export type TapSignals = MapWritableSignal<TapState>;

export type TapManager = TapFields<TapManagerName> & Tap;
export type TapPage = TapFields<string> & Tap;
export type TapAction = TapFields<TapActionNames> & Tap;
export type TapSetting = TapFields<TapSettingNames> & Tap;

export type TapToolbarConfig = TapConfig<TapManagerName>;
export type TapActionConfig = TapConfig<TapActionNames>;
export type TapSettingConfig = TapConfig<TapSettingNames>;
export type TapPageConfig = TapConfig<string>;

export interface TapFields<N> {
  name: N;
  hasName(name: N): boolean;
  onClick(): void;
  onHoldClick(): void;
  onDoubleClick(): void;
}

export interface TapState {
  icon: IconName;
  disabled: boolean;
  visibility: Visibility;
}

export interface TapOptions {
  confirm: boolean;
  navigate: boolean;
}

export interface TapProps {
  state?: Partial<TapState>;
  options?: Partial<TapOptions>;
}

export interface Tap {
  state: TapSignals;
  options: TapOptions;
  location: TapLocation;
  initialState: TapState;
  reset(): void;
  resetOne(key: keyof TapState): void;
}

export interface TapConfig<N> {
  name: N;
  props: TapProps;
}

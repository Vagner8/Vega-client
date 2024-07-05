import { IconName, MapWritableSignal, Visibility } from '@types';

export type TapManagerName = 'manager';
export type TapActionNames = 'Add' | 'Update' | 'Remove' | 'Send' | 'Confirm' | 'Cancel';
export type TapSettingNames = 'Setting';

export type TapLocation = 'pages' | 'actions' | 'settings' | 'manager';
export type TapExecutor = TapAction | TapSetting | TapPage;
export type TapSignals = MapWritableSignal<TapState>;

export type TapManager = Tap<TapManagerName>;
export type TapPage = Tap<string>;
export type TapAction = Tap<TapActionNames>;
export type TapSetting = Tap<TapSettingNames>;

export type TapToolbarConfig = TapConfig<TapManagerName>;
export type TapActionConfig = TapConfig<TapActionNames>;
export type TapSettingConfig = TapConfig<TapSettingNames>;
export type TapPageConfig = TapConfig<string>;

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

export interface Tap<N> {
  name: N;
  state: TapSignals;
  options: TapOptions;
  location: TapLocation;
  initialState: TapState;

  hasName(test: N): boolean;

  reset(): void;
  resetOne(key: keyof TapState): void;

  onClick(): void;
  onHoldClick(): void;
  onDoubleClick(): void;
}

export interface TapConfig<N> {
  name: N;
  props: TapProps;
}

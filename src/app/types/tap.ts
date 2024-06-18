import { IconName, MapWritableSignal, Visibility } from '@types';

export type TapActionNames = 'Add' | 'Update' | 'Remove' | 'Send' | 'Confirm' | 'Cancel';
export type TapLocation = TapToolbarNames | 'toolbar';
export type TapSettingNames = 'Setting';
export type TapToolbarNames = keyof TapActives;
export type TapActive = TapAction | TapSetting | TapPage;

export type TapPage = TapFields<string> & Tap;
export type TapAction = TapFields<TapActionNames> & Tap;
export type TapSetting = TapFields<TapSettingNames> & Tap;
export type TapToolbar = TapFields<TapToolbarNames> & Tap;

export type TapSignals = MapWritableSignal<TapState>;
export type TapsRecSignals = MapWritableSignal<TapRec>;

export type TapToolbarConfig = TapConfig<TapToolbarNames>;
export type TapActionConfig = TapConfig<TapActionNames>;
export type TapSettingConfig = TapConfig<TapSettingNames>;
export type TapPageConfig = TapConfig<string>;

export interface TapFields<N> {
  name: N;
  onClick(): void;
}

export interface TapRec {
  page: string | null;
  action: string | null;
  toolbar: TapToolbarNames | null;
}

export interface TapActives {
  pages: TapPage[];
  actions: TapAction[];
  settings: TapSetting[];
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
  rec(value: Partial<TapRec>): void;
  reset(): void;
  resetOne(key: keyof TapState): void;
  navigate(): void;
}

export interface TapConfig<N> {
  name: N;
  props: TapProps;
}

import { IconName } from '@types';
import { FRACTAL_NAMES, MODIFIERS_NAMES } from 'app/utils/constants';

export type TapsManagers = 'Manager';
export type TapsSidenavs = 'Settings' | 'Fractals' | 'Actions';
export type TapsFractals = (typeof FRACTAL_NAMES)[number];
export type TapsPages = 'Home' | TapsFractals;
export type TapsModifiers = (typeof MODIFIERS_NAMES)[number];
export type TapsSettings = 'Settings';
export type TapsNames = TapsPages | TapsModifiers | TapsSettings | TapsManagers;

export type TapType = TapsSidenavs | TapsManagers;

export interface TapConfig {
  icon: IconName;
  name: TapsNames;
  type: TapType;
}

export interface TapInfo {
  type: TapType;
  name: TapsNames | null;
}

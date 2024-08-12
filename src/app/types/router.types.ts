import { TapModifiersNames, TapPagesNames } from './tap.types';

export enum PathParams {
  Page = 'Page',
  Modifier = 'Modifier',
}

export interface QueryParams {
  ids: string | null;
}

export interface Segments {
  page: TapPagesNames | null;
  modifier: TapModifiersNames | null;
}

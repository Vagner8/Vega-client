import { FractalPagesNames, FractalModifiersNames } from '@types';

export enum PathParams {
  Page = 'Page',
  Modifier = 'Modifier',
}

export interface QueryParams {
  ids: string | null;
}

export interface Segments {
  page: FractalPagesNames | null;
  modifier: FractalModifiersNames | null;
}

import { WSS } from '@types';

export enum Queries {
  Taps = 'Taps',
  Page = 'Page',
  Items = 'Items',
  Manager = 'Manager',
  Modifier = 'Modifier',
}

export type Params = Record<Queries, WSS>;

// export interface Params {
//   rows: WSA;
//   taps: WSS;
//   page: WSS;
//   manager: WSS;
//   modifier: WSS;
// }

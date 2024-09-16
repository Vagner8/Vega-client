export enum QueryParams {
  Ids = 'ids',
  Manager = 'manager',
}

export type Segments = Record<QueryParams | 'params', string[]>;

export interface IdSet {
  str: string | null;
  arr: string[];
}

export enum Indicators {
  Icon = 'Icon',
  Sort = 'Sort',
  Fractal = 'Fractal',
}

export type ControlsData = Record<Indicators, string>;

export interface ControlDto {
  id?: string;
  parentId: string | null;
  data: string;
  indicator: string;
}

export interface ControlsDto {
  [key: string]: ControlDto;
}

export enum Indicators {
  Icon = 'Icon',
  Sort = 'Sort',
  FractalName = 'FractalName',
}

export interface ControlDto {
  id: string;
  indicator: string;
  data: string;
}

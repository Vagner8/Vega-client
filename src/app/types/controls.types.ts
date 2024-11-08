export enum Indicators {
  Icon = 'Icon',
  Sort = 'Sort',
  FractalName = 'FractalName',
}

export interface ControlDto {
  id: string;
  parentId: string;
  indicator: string;
  data: string;
}

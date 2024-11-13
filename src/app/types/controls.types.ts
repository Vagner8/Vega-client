export enum Indicators {
  Icon = 'Icon',
  Sort = 'Sort',
  Cursor = 'Cursor',
  Confirmation = 'Confirmation',
}

export interface ControlDto {
  id: string;
  parentId: string;
  indicator: string;
  data: string;
}

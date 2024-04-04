export enum TableName {
  Users = 'Users',
  Products = 'Products',
}

export enum FieldAction {
  None = 0,
  Create = 1,
  Update = 2,
  Delete = 3,
}

export interface FieldDto {
  id: string;
  name: string;
  value: string;
  action: FieldAction;
  order: number;
}

export interface TableDto {
  id: string;
  name: TableName;
  fields: FieldDto[];
}
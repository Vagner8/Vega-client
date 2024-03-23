export enum EntityName {
  Users = 'Users',
  Products = 'Products',
}

export enum FieldAction {
  None = 0,
  Create = 1,
  Update = 3,
  Delete = 4,
}

export interface FieldDto {
  id: string;
  name: string;
  value: string;
  action: FieldAction;
  order: number;
}

export interface EntityDto {
  id: string;
  name: EntityName;
  fields: FieldDto[];
}
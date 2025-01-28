export enum ControlInput {
  New = 'New',
  Text = 'text',
  Select = 'select',
  Organizer = 'organizer',
}

export enum ControlData {
  Input = 'text',
  Select = 'select',
}

export type ControlsDto = Record<string, ControlDto>;

export interface ControlDto {
  id: string;
  data: string;
  input: string;
  parentId: string;
  indicator: string;
}

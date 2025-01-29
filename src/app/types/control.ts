export const ControlInputs = {
  New: '1',
  Text: '2',
  Select: '3',
  Organizer: '4',
} as const;

export type ControlsDto = Record<string, ControlDto>;

export interface ControlDto {
  id: string;
  data: string;
  input: string;
  parentId: string;
  indicator: string;
}

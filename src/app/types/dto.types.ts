export interface MatrixDto {
  id: string;
  lines: LineDto[];
  controls: ControlDto[];
}

export interface LineDto {
  id: string;
  Controls: ControlDto[]
}

export interface ControlDto {
  id: string;
  type: string;
  name: string;
  value: string;
  operation: string;
}
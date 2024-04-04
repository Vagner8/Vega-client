import { Control, ControlDto } from './control.type';
import { Line, LineDto } from './line.type';

export enum DefaultControls {
  Matrix = 'matrix'
}

export interface Matrix {
  id?: string;
  lines: Line[];
  controls: Control[]
}

export interface MatrixDto {
  id?: string;
  lines?: LineDto[];
  controls: ControlDto[]
}
import { ControlDto, Controls } from './control';
import { Group, GroupDto } from './group';

export interface MatrixDto {
  id: string;
  groups: GroupDto[];
  controls: ControlDto[];
}

export interface Matrix {
  id?: string;
  groups: Group[];
  controls: Controls;
}

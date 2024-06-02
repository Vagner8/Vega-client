import { Control, ControlDto } from './control.types';
import { Group, GroupDto } from './group.types';

export interface MatrixDto {
  id: string;
  groups: GroupDto[];
  controls: ControlDto[];
}

export interface Matrix {
  id?: string;
  groups: Group[];
  controls: Control[];
}

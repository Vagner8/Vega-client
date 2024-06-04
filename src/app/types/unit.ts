import { ControlDto, Controls } from './control';

export interface UnitDto {
  id: string;
  controls: ControlDto[];
}

export interface Unit {
  id: string;
  controls: Controls;
}

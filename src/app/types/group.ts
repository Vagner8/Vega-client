import { ControlDto, Controls } from './control';
import { Unit, UnitDto } from './unit';

export interface GroupDto {
  id: string;
  units: UnitDto[];
  controls: ControlDto[];
}

export interface Group {
  id?: string;
  units: Unit[];
  controls: Controls;
}

import { Control, ControlDto } from './control.types';
import { Unit, UnitDto } from './unit.types';

export interface GroupDto {
  id: string;
  units: UnitDto[];
  controls: ControlDto[];
}

export interface Group {
  id?: string;
  units: Unit[];
  controls: Control[];
}

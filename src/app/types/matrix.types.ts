import { Control, ControlDto } from './control.types';
import { UnitDto, Unit } from './unit.types';

export interface MatrixDto {
  id?: string;
  units: UnitDto[];
  controls: ControlDto[];
}

export interface Matrix {
  id?: string;
  units: Unit[];
  controls: Control[];
}

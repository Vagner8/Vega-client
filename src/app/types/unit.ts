import { Controls, ControlsDto } from '@types';

export interface Unit {
  id?: string;
  unitId: string;
  units: Unit[];
  controls: Controls;
}

export interface UnitDto {
  id?: string;
  unitId: string;
  units: UnitDto[];
  controls: ControlsDto;
}

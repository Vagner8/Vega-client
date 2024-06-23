import { Controls, ControlsDto } from '@types';

export interface Unit {
  id?: string;
  parentId: string;
  units: Units;
  controls: Controls;
}

export interface Units {
  [key: string]: Unit;
}

export interface UnitDto {
  id?: string;
  parentId: string;
  units: UnitsDto;
  controls: ControlsDto;
}

export interface UnitsDto {
  [key: string]: UnitDto;
}

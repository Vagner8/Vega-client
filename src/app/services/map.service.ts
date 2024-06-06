import { Injectable } from '@angular/core';
import {
  ControlDto,
  Controls,
  Group,
  GroupDto,
  Matrix,
  MatrixDto,
  Unit,
  UnitDto,
} from '@types';
import { Control } from '@controls';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  toMatrix = ({ id, groups, controls }: MatrixDto): Matrix => {
    return {
      id,
      groups: this.toGroups(groups),
      controls: this.toControls(controls),
    };
  };

  toGroups = (groups: GroupDto[]): Group[] => {
    return groups.map(({ id, units, controls }) => ({
      id,
      units: this.toUnits(units),
      controls: this.toControls(controls),
    }));
  };

  toUnits = (units: UnitDto[]): Unit[] => {
    return units.map(({ id, controls }) => ({
      id,
      controls: this.toControls(controls),
    }));
  };

  toControls = (controls: ControlDto[]): Controls => {
    return controls.reduce((acc, control) => {
      acc[control.indicator] = new Control({ dto: control });
      return acc;
    }, {} as Controls);
  };
}

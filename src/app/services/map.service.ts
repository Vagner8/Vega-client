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
import { ControlService, TapService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private tap: TapService, private control: ControlService) {}

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
    return controls.reduce((acc, c) => {
      acc[c.indicator] = this.control.create(c);
      return acc;
    }, {} as Controls);
  };
}

import { Injectable } from '@angular/core';
import {
  ControlDto,
  Controls,
  Group,
  GroupDto,
  GroupIndicator,
  Matrix,
  MatrixDto,
  Unit,
  UnitDto,
} from '@types';
import { Control } from '@controls';
import { TapService } from './tap.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private _tap: TapService) {}

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
      if (c.indicator === GroupIndicator.Group) this._tap.addPage(c);
      acc[c.indicator] = new Control({ dto: c });
      return acc;
    }, {} as Controls);
  };
}

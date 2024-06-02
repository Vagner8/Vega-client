import { Injectable } from '@angular/core';
import {
  Control,
  ControlDto,
  Group,
  GroupDto,
  Matrix,
  MatrixDto,
  Unit,
  UnitDto,
} from '@types';
import { ControlService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private control: ControlService) {}

  toMatrix = ({ id, groups, controls }: MatrixDto): Matrix => {
    return {
      id,
      groups: groups.map(this.toGroup),
      controls: controls.map(this.toControl),
    };
  };

  toGroup = ({ id, units, controls }: GroupDto): Group => {
    return {
      id,
      units: units.map(this.toUnit),
      controls: controls.map(this.toControl),
    };
  };

  toUnit = ({ id, controls }: UnitDto): Unit => {
    return {
      id,
      controls: controls.map(this.toControl),
    };
  };

  toControl = (control: ControlDto): Control => {
    return this.control.create(control);
  };
}

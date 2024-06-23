import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, ControlDto, Controls, ControlsDto, UnitDto, Unit, UnitsDto, Units } from '@types';
import { TapService } from './tap.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private ts: TapService) {}

  toUnit = ({ id, parentId, controls, units }: UnitDto): Unit => {
    return {
      id,
      parentId,
      controls: this.toControls(controls),
      units: this.toUnits(units),
    };
  };

  toUnits(units: UnitsDto): Units {
    const dto: Units = {};
    for (const key in units) {
      dto[key] = this.toUnit(units[key]);
    }
    return dto;
  }

  toControls(dto: ControlsDto): Controls {
    const controls: Controls = {};
    for (const key in dto) {
      controls[key] = this.toControl(dto[key]);
    }
    return controls;
  }

  toControl({ id, parentId, indicator, data }: ControlDto): Control {
    return {
      id,
      parentId,
      indicator: new FormControl(indicator),
      data: new FormControl(data),
      state: { disabled: signal(false) },
    };
  }

  toUnitDto({ id, parentId, controls, units }: Unit): UnitDto {
    return {
      id,
      parentId,
      controls: this.toControlsDto(controls),
      units: this.toUnitsDto(units),
    };
  }

  toUnitsDto(units: Units): UnitsDto {
    const dto: UnitsDto = {};
    for (const key in units) {
      dto[key] = this.toUnitDto(units[key]);
    }
    return dto;
  }

  toControlsDto(control: Controls): ControlsDto {
    const dto: ControlsDto = {};
    for (const key in control) {
      dto[key] = this.toControlDto(control[key]);
    }
    return dto;
  }

  toControlDto({ id, parentId, indicator, data }: Control): ControlDto {
    return {
      id,
      parentId,
      indicator: indicator.value || '',
      data: data.value || '',
    };
  }
}

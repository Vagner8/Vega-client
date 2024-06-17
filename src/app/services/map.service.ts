import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, ControlDto, Controls, ControlsDto, UnitDto, Unit } from '@types';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  toUnit = ({ id, unitId, controls, units }: UnitDto): Unit => {
    return {
      id,
      unitId,
      controls: this.toControls(controls),
      units: units.length === 0 ? [] : units.map(this.toUnit),
    };
  };

  toControls(dto: ControlsDto): Controls {
    const controls: Controls = {};
    for (const key in dto) {
      controls[key] = this.toControl(dto[key]);
    }
    return controls;
  }

  toControl({ id, unitId, indicator, data }: ControlDto): Control {
    return {
      id,
      unitId,
      indicator: new FormControl(indicator),
      data: new FormControl(data),
      state: { disabled: signal(false) },
    };
  }

  toUnitDto({ id, unitId, controls, units }: Unit): UnitDto {
    return {
      id,
      unitId,
      controls: this.toControlsDto(controls),
      units: units.length === 0 ? [] : units.map(this.toUnitDto),
    };
  }

  toControlsDto(control: Controls): ControlsDto {
    const dto: ControlsDto = {};
    for (const key in control) {
      dto[key] = this.toControlDto(control[key]);
    }
    return dto;
  }

  toControlDto({ id, unitId, indicator, data }: Control): ControlDto {
    return {
      id: id || '',
      unitId,
      indicator: indicator.value || '',
      data: data.value || '',
    };
  }
}

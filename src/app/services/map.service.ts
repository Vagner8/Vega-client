import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlDto, MatrixDto, UnitDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  toMatrix({ id, units, controls }: MatrixDto) {
    return {
      id,
      units: units.map(this.toUnit),
      controls: controls.map(this.toControl),
    };
  }

  toUnit({ id, controls }: UnitDto) {
    return {
      id,
      controls: controls.map(this.toControl),
    };
  }

  toControl({ id, name, data, type, act }: ControlDto) {
    return {
      id,
      name: new FormControl(name),
      data: new FormControl(data),
      type: new FormControl(type),
      act: new FormControl(act),
    };
  }
}

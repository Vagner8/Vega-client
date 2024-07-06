import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Control,
  ControlDto,
  Controls,
  ControlsDto,
  FractalDto,
  Fractal,
  FractalsDto,
  Fractals,
  Indicator,
} from '@types';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  toFractal = ({ id, parentId, controls, fractals }: FractalDto): Fractal => {
    return {
      id,
      parentId,
      controls: this.toControls(controls),
      fractals: this.toFractals(fractals),

      data(indicator) {
        return this.controls[indicator].data.value;
      },
      childArr(name) {
        return Object.values(this.fractals[name].fractals);
      },
      childSort(name) {
        return this.fractals[name].controls[Indicator.Sort].data.value?.split(':');
      },
    };
  };

  toFractals(fractals: FractalsDto): Fractals {
    const dto: Fractals = {};
    for (const key in fractals) {
      dto[key] = this.toFractal(fractals[key]);
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

  toFractalDto({ id, parentId, controls, fractals }: Fractal): FractalDto {
    return {
      id,
      parentId,
      controls: this.toControlsDto(controls),
      fractals: this.toFractalsDto(fractals),
    };
  }

  toFractalsDto(fractals: Fractals): FractalsDto {
    const dto: FractalsDto = {};
    for (const key in fractals) {
      dto[key] = this.toFractalDto(fractals[key]);
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

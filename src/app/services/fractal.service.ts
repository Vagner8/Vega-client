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
} from '@types';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  dto = signal<FractalDto | null>(null);
  fractal = signal<Fractal | null>(null);
  selected = signal<Fractal[]>([]);

  constructor(private ss: StateService) {}

  onInit = (dto: FractalDto) => {
    this.dto.set(dto);
    this.fractal.set(this.toFractal(dto));
  };

  private toFractal = ({ id, parentId, controls, fractals }: FractalDto): Fractal => {
    return {
      id,
      parentId,
      controls: this.toControls(controls),
      fractals: this.toFractals(fractals),
    };
  };

  private toFractals(fractals: FractalsDto): Fractals {
    const dto: Fractals = {};
    for (const key in fractals) {
      dto[key] = this.toFractal(fractals[key]);
    }
    return dto;
  }

  private toControls(dto: ControlsDto): Controls {
    const controls: Controls = {};
    for (const key in dto) {
      controls[key] = this.toControl(dto[key]);
    }
    return controls;
  }

  private toControl({ id, parentId, indicator, data }: ControlDto): Control {
    return {
      id,
      parentId,
      indicator: new FormControl(indicator),
      data: new FormControl(data),
      state: { disabled: signal(false) },
    };
  }

  private toFractalDto({ id, parentId, controls, fractals }: Fractal): FractalDto {
    return {
      id,
      parentId,
      controls: this.toControlsDto(controls),
      fractals: this.toFractalsDto(fractals),
    };
  }

  private toFractalsDto(fractals: Fractals): FractalsDto {
    const dto: FractalsDto = {};
    for (const key in fractals) {
      dto[key] = this.toFractalDto(fractals[key]);
    }
    return dto;
  }

  private toControlsDto(control: Controls): ControlsDto {
    const dto: ControlsDto = {};
    for (const key in control) {
      dto[key] = this.toControlDto(control[key]);
    }
    return dto;
  }

  private toControlDto({ id, parentId, indicator, data }: Control): ControlDto {
    return {
      id,
      parentId,
      indicator: indicator.value || '',
      data: data.value || '',
    };
  }
}

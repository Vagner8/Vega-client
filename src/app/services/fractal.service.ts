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
import { TapService } from './tap.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  dto = signal<FractalDto | null>(null);
  fractal = signal<Fractal | null>(null);
  selected = signal<Fractal[]>([]);

  constructor(
    private ts: TapService,
    private ss: StateService,
  ) {}

  onInit = (dto: FractalDto) => {
    this.dto.set(dto);
    this.fractal.set(this.toFractal(dto));
    this.ts.addPages(dto);
  };

  private toFractal = ({ id, parentId, controls, fractals }: FractalDto): Fractal => {
    const fractal: Fractal = {
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
      onClick: () => {
        this.selected.update((state) =>
          state.includes(fractal) ? state.filter((f) => f !== fractal) : [...state, fractal],
        );
        this.ts.executors$.next(this.ts.actions);
        this.ss.sidenav.set('open');
      },
      onHoldClick: () => {},
      onDoubleClick: () => {},
    };
    return fractal;
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

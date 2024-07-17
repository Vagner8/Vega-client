import { Injectable } from '@angular/core';
import { ControlsDto, FractalNames, IconName, Indicator } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor() {}

  icon(controls: ControlsDto): IconName {
    return controls[Indicator.Icon].data as IconName;
  }

  pageName(controls: ControlsDto): FractalNames {
    return controls[Indicator.Fractal].data as FractalNames;
  }

  sort(controls: ControlsDto): string[] {
    return controls[Indicator.Sort].data.split(':');
  }
}

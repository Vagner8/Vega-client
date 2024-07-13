import { Injectable } from '@angular/core';
import { ControlsDto, IconName, Indicator, TapPagesNames } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor() {}

  icon(controls: ControlsDto): IconName {
    return controls[Indicator.Icon].data as IconName;
  }

  pageName(controls: ControlsDto): TapPagesNames {
    return controls[Indicator.Fractal].data as TapPagesNames;
  }

  sort(controls: ControlsDto): string[] {
    return controls[Indicator.Sort].data.split(':');
  }
}

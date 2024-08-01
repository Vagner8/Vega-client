import { Injectable } from '@angular/core';
import { ControlsDto, Indicator, ParsedControl } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  parse(controls: ControlsDto): ParsedControl {
    return {
      name: controls[Indicator.Fractal] ? controls[Indicator.Fractal].data : '',
      icon: controls[Indicator.Icon] ? controls[Indicator.Icon].data : 'apps',
      sort: controls[Indicator.Sort] ? controls[Indicator.Sort].data.split(':') : [],
    } as ParsedControl;
  }
}

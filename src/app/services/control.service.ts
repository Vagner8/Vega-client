import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Control, ControlDto, ControlIndicator } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  findDto(indicator: ControlIndicator, controls: ControlDto[]): ControlDto | undefined {
    return controls.find((c) => c.indicator === indicator);
  }

  find(indicator: ControlIndicator, controls: Control[]): Control | undefined {
    return controls.find((c) => c.indicator.value === indicator);
  }

  create({ id, indicator, data }: ControlDto): Control {
    return {
      id,
      indicator: new FormControl(indicator || ''),
      data:  new FormControl(data || ''),
      signal: signal({ disabled: false })
    }
  }
}

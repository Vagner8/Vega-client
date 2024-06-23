import { Injectable } from '@angular/core';
import { ControlsDto, IconName, Indicator } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor() {}

  icon(controls: ControlsDto): IconName {
    return controls[Indicator.Icon].data as IconName;
  }

  parseSort(value: string): string[] {
    return value.split(':');
  }
}

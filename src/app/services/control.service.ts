import { Injectable } from '@angular/core';
import { INDICATORS } from '@constants';
import { ControlsData, ControlsDto, Indicators } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  parse(controls: ControlsDto): ControlsData {
    return INDICATORS.reduce(
      (acc, indicator) => {
        const data = controls[indicator]?.data;
        if (data) {
          acc[indicator] = data;
        }
        return acc;
      },
      {} as Record<Indicators, string>,
    );
  }
}

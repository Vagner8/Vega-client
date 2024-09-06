import { Pipe, PipeTransform } from '@angular/core';
import { INDICATORS } from '@constants';
import { ControlsData, ControlsDto } from '@types';

@Pipe({
  name: 'controlsData',
  standalone: true,
})
export class ControlsDataPipe implements PipeTransform {
  transform(controls: ControlsDto): ControlsData {
    return INDICATORS.reduce((acc, indicator) => {
      const data = controls[indicator]?.data;
      if (data) {
        acc[indicator] = data;
      }
      return acc;
    }, {} as ControlsData);
  }
}

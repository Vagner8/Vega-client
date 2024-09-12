import { Pipe, PipeTransform } from '@angular/core';
import { INDICATORS } from '@constants';
import { FractalDto } from '@types';

@Pipe({
  name: 'cp',
  standalone: true,
})
export class ControlsPipe implements PipeTransform {
  transform({ controls }: FractalDto): any {
    return INDICATORS.reduce((acc, indicator) => {
      const data = controls[indicator]?.data;
      if (data) {
        if (indicator === 'Sort') {
          acc[indicator] = data.split(':');
        } else {
          acc[indicator] = data;
        }
      }
      return acc;
    }, {} as any);
  }
}

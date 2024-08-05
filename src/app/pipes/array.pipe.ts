import { Pipe, PipeTransform } from '@angular/core';
import { ControlDto, ControlsDto } from '@types';

@Pipe({
  name: 'array',
  standalone: true,
})
export class ArrayPipe implements PipeTransform {
  transform(value: ControlsDto): ControlDto[] {
    return Object.values(value);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { MatrixDto } from '@types';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(value: string): string[] {
    return value.split(':');
  }
}

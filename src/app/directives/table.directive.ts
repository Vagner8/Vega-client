import { Directive } from '@angular/core';
import { MatTable } from '@mat';
import { FractalService } from '@services';

@Directive({
  selector: '[appTable]',
  standalone: true,
})
export class TableDirective {
  constructor(
    private fs: FractalService,
    private table: MatTable<unknown>,
  ) {}
}

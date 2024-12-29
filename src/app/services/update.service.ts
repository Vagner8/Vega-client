import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService extends BaseService {
  $currents = signal<IFractal[]>([]);

  set(row: IFractal): void {
    this.$currents.update(prev => (prev.includes(row) ? prev.filter(fractal => fractal !== row) : [...prev, row]));
  }
}

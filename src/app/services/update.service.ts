import { Injectable, signal } from '@angular/core';
import { ControlDto, IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService extends BaseService {
  $fractals = signal<IFractal[]>([]);
  $controls = signal<ControlDto[]>([]);

  set(row: IFractal | ControlDto): void {
    if (this.isFractal(row)) {
      this.$fractals.update(prev => this.update(prev, row));
    }

    if (this.isControl(row)) {
      this.$controls.update(prev => this.update(prev, row));
    }
  }

  reset(): void {
    this.$fractals().length > 0 && this.$fractals.set([]);
    this.$controls().length > 0 && this.$controls.set([]);
  }

  private update<T>(prev: T[], row: T): T[] {
    return prev.includes(row) ? prev.filter(fractal => fractal !== row) : [...prev, row];
  }
}

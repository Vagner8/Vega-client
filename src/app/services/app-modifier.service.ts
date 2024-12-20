import { Injectable, WritableSignal } from '@angular/core';
import { BaseService } from './base.service';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class AppModifierService extends BaseService {
  $levels: Record<string, WritableSignal<IFractal>> = {};

  getNestingLevel(fractal: IFractal): number {
    let level = 0;
    let current: IFractal | null = fractal;
    while (current) {
      level++;
      current = current.parent;
    }
    return level;
  }
}

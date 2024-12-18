import { Injectable } from '@angular/core';
import { FractalDto, FractalsDto, IFractal, IFractals } from '@types';
import { Fractal } from '@utils';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RootService extends BaseService {
  toFractal(dto: FractalDto): IFractal {
    const root = new Fractal(dto, null);
    root.fractals = this.toFractals(dto.fractals, root);
    return root;
  }

  private toFractals(dto: FractalsDto | null, parent: IFractal): IFractals | null {
    if (!dto) return null;
    const result: IFractals = {};
    for (const indicator in dto) {
      const fractal = new Fractal(dto[indicator], parent);
      fractal.fractals = this.toFractals(dto[indicator].fractals, fractal);
      result[indicator] = fractal;
    }
    return result;
  }
}

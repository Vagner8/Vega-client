import { Injectable } from '@angular/core';
import { Fractal, FractalDto } from '@types';
import { FractalClass } from '@utils';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  constructor(public ds: DataService) {}

  toFractal(dto: FractalDto): Fractal {
    return this.create(dto, this.toFractals(dto.fractals));
  }

  private toFractals(fractals: FractalDto[] | null): Fractal[] | null {
    if (!fractals) return null;
    return fractals.map(dto => this.create(dto, this.toFractals(dto.fractals)));
  }

  private create(dto: FractalDto, fractals: Fractal[] | null): Fractal {
    return new FractalClass(dto, fractals, this);
  }
}

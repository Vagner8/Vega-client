import { Injectable } from '@angular/core';
import { Fractal, FractalDto } from '@types';
import { FractalClass } from '@utils';
import { DataService, StateService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  constructor(
    public ds: DataService,
    public ss: StateService
  ) {}

  toFractal(dto: FractalDto): Fractal {
    return this.create(dto, this.toFractals(dto.fractals));
  }

  private toFractals(fractals: FractalDto[]): Fractal[] {
    if (!fractals) return [];
    return fractals.map(dto => this.create(dto, this.toFractals(dto.fractals)));
  }

  private create(dto: FractalDto, fractals: Fractal[]): Fractal {
    return new FractalClass(dto, fractals, this);
  }
}

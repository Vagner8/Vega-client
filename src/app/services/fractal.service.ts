import { Injectable, signal } from '@angular/core';
import { Fractal, FractalDto } from '@types';
import { MapService, TapService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  dto = signal<FractalDto | null>(null);
  fractal!: Fractal;

  constructor(
    private ms: MapService,
    private ts: TapService,
  ) {}

  run = (dto: FractalDto): void => {
    this.dto.set(dto);
    this.fractal = this.ms.toFractal(dto);
    this.ts.addPages(dto);
  };
}

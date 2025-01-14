import { FractalDto, FractalsDto, IFractal, IFractals } from '@types';
import { Fractal } from './fractal';
import { createForm } from './helpers';

export const fractalFactory = (dto: FractalDto, parent: IFractal = new Fractal()): IFractal => {
  const fractal = new Fractal();
  fractal.dto = dto;
  fractal.form = createForm(dto.controls);
  fractal.parent = parent;
  fractal.fractals = fractalsFactory(dto.fractals, fractal);
  return fractal;
};

const fractalsFactory = (dto: FractalsDto | null, parent: IFractal): IFractals | null => {
  if (!dto) return null;
  const result: IFractals = {};
  for (const indicator in dto) {
    const fractal = fractalFactory(dto[indicator], parent);
    fractal.fractals = fractalsFactory(dto[indicator].fractals, fractal);
    result[indicator] = fractal;
  }
  return result;
};

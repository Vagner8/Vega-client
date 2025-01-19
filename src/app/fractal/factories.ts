import { ControlsDto, FractalDto, FractalsDto, IFractal, IFractals, Indicators, SplitebleIndicators } from '@types';
import { Fractal } from './fractal';
import { createForm } from './helpers';
import { v4 } from 'uuid';

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

export const dtoFactory = (parent: IFractal, columns: string[]): FractalDto => {
  const id = v4();
  return {
    id,
    parentId: parent.dto.id,
    fractals: null,
    controls: columns.reduce((acc: ControlsDto, indicator) => {
      acc[indicator] = {
        id: v4(),
        parentId: id,
        data: '',
        indicator,
      };
      return acc;
    }, {}),
  };
};

export const childFactory = (parent: IFractal): IFractal => {
  const columns = parent.split(SplitebleIndicators.Columns);
  const dto = dtoFactory(parent, columns.length === 0 ? [Indicators.Cursor] : columns);
  console.log('🚀 ~ dto:', dto);
  return fractalFactory(dto, parent);
};

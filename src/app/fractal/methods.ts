import { IFractal, IFractals } from '@types';

export const findFractal = (test: string, fractals: IFractals | null): IFractal => {
  const fractal = findFractalRecursively(test, fractals);
  if (fractal) return fractal;
  else throw new Error(`Unable to find fractal by: ${test}`);
};

const findFractalRecursively = (test: string, fractals: IFractals | null): IFractal | null => {
  if (fractals) {
    for (const key in fractals) {
      if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
      const found = findFractalRecursively(test, fractals[key].fractals);
      if (found) return found;
    }
  }
  return null;
};

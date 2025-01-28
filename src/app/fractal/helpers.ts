import { FormControl, FormRecord } from '@angular/forms';
import { ControlsDto, Fractal, Fractals } from '@types';

export const createForm = (controls: ControlsDto): FormRecord =>
  new FormRecord(
    Object.values(controls).reduce((acc: Record<string, FormControl>, { indicator, data }) => {
      acc[indicator] = new FormControl(data);
      return acc;
    }, {})
  );

export const findFractalRecursively = (test: string, fractals: Fractals | null): Fractal | null => {
  if (fractals) {
    for (const key in fractals) {
      if (fractals[key].is(test) || fractals[key].dto.id === test) return fractals[key];
      const found = findFractalRecursively(test, fractals[key].fractals);
      if (found) return found;
    }
  }
  return null;
};

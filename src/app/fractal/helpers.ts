import { FormControl, FormRecord } from '@angular/forms';
import { ControlFieldsNames, ControlsDto, Fractal, FractalForm, Fractals } from '@types';

export const createForm = (controls: ControlsDto): FractalForm => {
  return new FormRecord(
    Object.values(controls).reduce((acc: Record<string, FormRecord>, controlDto) => {
      acc[controlDto.indicator] = new FormRecord(
        ControlFieldsNames.reduce((acc: Record<string, FormControl>, field) => {
          acc[field] = new FormControl(controlDto[field]);
          return acc;
        }, {})
      );
      return acc;
    }, {})
  ) as FractalForm;
};

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

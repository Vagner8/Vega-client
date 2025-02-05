import { FormControl, FormRecord } from '@angular/forms';
import { FractalFactory } from '@fractal';
import { ControlFormsFields, Fractal, FractalForm, Fractals, FractalsDto } from '@types';

export const createForm = (fractal: Fractal): FractalForm => {
  const formRecord = new FormRecord(
    fractal.controls.reduce((acc: Record<string, FormRecord>, controlDto) => {
      acc[controlDto.indicator] = new FormRecord(
        Object.values(ControlFormsFields).reduce((acc: Record<string, FormControl>, field) => {
          acc[field] = new FormControl(controlDto[field]);
          return acc;
        }, {})
      );
      return acc;
    }, {})
  ) as FractalForm;

  if (fractal.isItem) {
    fractal.parent.childrenForms.addControl(fractal.cursor, formRecord);
  }
  new FormRecord({}).addControl(fractal.cursor, formRecord);
  return formRecord;
};

export const createFractalsRecursively = (fractalsDto: FractalsDto | null, parent: Fractal): Fractals | null => {
  if (!fractalsDto) return null;
  const result: Fractals = {};
  for (const indicator in fractalsDto) {
    const fractal = new FractalFactory({ parent, dto: fractalsDto[indicator] });
    fractal.fractals = createFractalsRecursively(fractalsDto[indicator].fractals, fractal);
    result[indicator] = fractal;
  }
  return result;
};

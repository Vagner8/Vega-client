import { FormControl, FormRecord } from '@angular/forms';
import { FractalFactory } from '@fractal';
import { ControlFormsFieldsNames, ControlsDto, Fractal, FractalDto, FractalForm, Indicators } from '@types';

export const createForm = (controls: ControlsDto): FractalForm => {
  return new FormRecord(
    Object.values(controls).reduce((acc: Record<string, FormRecord>, controlDto) => {
      acc[controlDto.indicator] = new FormRecord(
        ControlFormsFieldsNames.reduce((acc: Record<string, FormControl>, field) => {
          acc[field] = new FormControl(controlDto[field]);
          return acc;
        }, {})
      );
      return acc;
    }, {})
  ) as FractalForm;
};

export const createDefaultFractal = (cursor: string): Fractal => {
  const dto: FractalDto = {
    id: '',
    parentId: '',
    controls: {
      [Indicators.Cursor]: {
        id: '',
        parentId: '',
        indicator: Indicators.Cursor,
        data: cursor,
        input: '',
      },
    },
    fractals: null,
  };

  return new FractalFactory({ dto });
};

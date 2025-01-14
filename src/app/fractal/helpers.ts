import { FormControl, FormRecord } from '@angular/forms';
import { ControlsDto } from '@types';

export const createForm = (controls: ControlsDto): FormRecord =>
  new FormRecord(
    Object.values(controls).reduce((acc: Record<string, FormControl>, { indicator, data }) => {
      acc[indicator] = new FormControl(data);
      return acc;
    }, {})
  );

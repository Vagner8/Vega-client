import {
  ControlsDto,
  ControlsIndicators,
  FractalProps,
  Fractals,
  IFractal,
} from '@types';
import { hasOwnProperty } from '@utils';
import { INDICATORS } from '@constants';

export class Fractal implements IFractal {
  readonly id: string;
  readonly parentId: string;
  readonly controls: ControlsDto;
  readonly fractals: Fractals | null;

  constructor({ id, parentId, fractals, controls }: FractalProps) {
    this.id = id;
    this.parentId = parentId;
    this.fractals = fractals;
    this.controls = controls;
  }

  find(name: string, { fractals }: IFractal = this): IFractal {
    if (!fractals) return this;
    if (hasOwnProperty(fractals, name)) return fractals[name];
    for (const key in fractals) {
      const fractal = this.find(name, fractals[key]);
      if (fractal) return fractal;
    }
    return this;
  }

  data(indicator: ControlsIndicators): string {
    const data = this.controls[indicator]?.data;
    if (!data) throw new Error(`No data for indicator: ${indicator}`);
    return data;
  }

  sort(): string[] {
    const sort = this.controls[INDICATORS[0]]?.data;
    return sort ? sort.split(':') : [];
  }

  toArray(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }
}

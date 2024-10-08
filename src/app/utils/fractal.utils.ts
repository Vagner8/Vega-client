import { FractalProps, Fractals, IFractal, Indicators, ControlsData, ControlsDto } from '@types';
import { hasOwnProperty } from '@utils';

export class Fractal implements IFractal {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly sort: string[];
  readonly parentId: string;
  readonly controls: ControlsDto;
  readonly fractals: Fractals | null;

  constructor(private fractal: FractalProps) {
    const { id, parentId, fractals, controls } = this.fractal;
    const { Icon, Sort, Fractal } = this.controlsData(controls);
    this.id = id;
    this.name = Fractal;
    this.icon = Icon;
    this.sort = Sort.split(':').filter(Boolean);
    this.parentId = parentId;
    this.controls = controls || {};
    this.fractals = fractals;
  }

  is(test: string | object, callback?: (fractal: IFractal) => void): boolean {
    let result = false;
    switch (typeof test) {
      case 'string':
        result = this.name === test;
        break;
      case 'object':
        result = Object.values(test).some(item => this.name === item);
        break;
    }
    result && callback && callback(this);
    return result;
  }

  find(name: string, { fractals }: IFractal = this): IFractal {
    if (!fractals) return this;
    if (hasOwnProperty(fractals, name)) return fractals[name];
    for (const key in fractals) {
      const fractal = this.find(name, fractals[key]);
      if (fractal !== this) return fractal;
    }
    return this;
  }

  data(indicator: string): string {
    return this.controls[indicator].data;
  }

  get array(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }

  private controlsData(controls: ControlsDto | undefined): ControlsData {
    return Object.values(Indicators).reduce((acc, indicator) => {
      acc[indicator] = controls?.[indicator]?.data || '';
      return acc;
    }, {} as ControlsData);
  }
}

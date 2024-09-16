import {
  FractalProps,
  Fractals,
  IFractal,
  Indicators,
  ControlsData,
  ControlsDto,
  FractalType,
} from '@types';
import { hasOwnProperty, isModifierName, isPageName } from '@utils';

export class Fractal implements IFractal {
  readonly id: string;
  readonly name: string;
  readonly type: FractalType;
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
    this.type = this.setType;
    this.icon = Icon;
    this.sort = Sort.split(':').filter(Boolean);
    this.parentId = parentId;
    this.controls = controls || {};
    this.fractals = fractals;
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

  private get setType(): FractalType {
    if (isPageName(this.name)) return FractalType.Pages;
    if (isModifierName(this.name)) return FractalType.Modifiers;
    return FractalType.None;
  }
}

import { FractalProps, Fractals, IFractal, IControls } from '@types';
import { hasOwnProperty } from '@utils';

export class Fractal implements IFractal {
  readonly id: string;
  readonly parentId: string;
  readonly controls: IControls;
  readonly fractals: Fractals | null;

  constructor(private root: FractalProps) {
    const { id, parentId, fractals, controls } = this.root;
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
      if (fractal !== this) return fractal;
    }
    return this;
  }

  get array(): IFractal[] {
    return this.fractals ? Object.values(this.fractals) : [];
  }
}

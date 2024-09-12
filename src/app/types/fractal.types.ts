import { FRACTALS, MODIFIERS, PAGES } from '@constants';
import { ControlsDto, ControlsIndicators } from '@types';

export type FractalTapNames = (typeof FRACTALS)[number];
export type FractalPagesNames = (typeof PAGES)[number];
export type FractalModifiersNames = (typeof MODIFIERS)[number];

export type FractalNames =
  | FractalTapNames
  | FractalPagesNames
  | FractalModifiersNames;

export type FractalsDto = Record<string, FractalDto>;
export type Fractals = Record<string, IFractal>;

export interface FractalBase {
  id: string;
  parentId: string;
  controls: ControlsDto;
}

export interface FractalDto extends FractalBase {
  fractals: FractalsDto | null;
}

export interface FractalProps extends FractalBase {
  fractals: Fractals | null;
}

export interface IFractal extends FractalBase {
  id: string;
  parentId: string;
  fractals: Fractals | null;
  data(indicator: ControlsIndicators): string;
  find(name: string, fractal?: IFractal): IFractal;
  sort(): string[];
  toArray(): IFractal[];
}

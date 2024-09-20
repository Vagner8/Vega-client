import { ControlsDto } from '@types';

export enum Roots {
  None = 'None',
  Pages = 'Pages',
  Manager = 'Manager',
  Modifiers = 'Modifiers',
}

export enum Pages {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
}

export enum Modifiers {
  Add = 'Add',
  Edit = 'Edit',
  Save = 'Save',
  Delete = 'Delete',
}

export type FractalsDto = Record<string, FractalDto>;
export type Fractals = Record<string, IFractal>;

export interface FractalBase {
  id: string;
  parentId: string;
  controls?: ControlsDto;
}

export interface FractalDto extends FractalBase {
  fractals: FractalsDto | null;
}

export interface FractalProps extends FractalBase {
  fractals: Fractals | null;
}

export interface IFractal extends FractalProps {
  name: string;
  type: Roots;
  icon: string;
  sort: string[];
  get array(): IFractal[];
  data(indicator: string): string;
  find(name: string, fractal?: IFractal): IFractal;
}

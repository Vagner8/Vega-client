import { ControlsDto } from '@types';

export enum Roots {
  Items = 'Items',
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
export type FractalType = IFractal | null | undefined;

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
  icon: string;
  sort: string[];
  get array(): IFractal[];
  is(test: string | object, callback?: (fractal: IFractal) => void): boolean;
  data(indicator: string): string;
  find(name: string, fractal?: IFractal): IFractal;
}

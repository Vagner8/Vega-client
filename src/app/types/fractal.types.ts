import { ControlsDto, IControls } from '@types';

export enum FractalTapsNames {
  Pages = 'Pages',
  Manager = 'Manager',
  Modifiers = 'Modifiers',
}

export enum FractalPagesNames {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
}

export enum FractalModifiersNames {
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
}

export interface FractalDto extends FractalBase {
  controls: ControlsDto;
  fractals: FractalsDto | null;
}

export interface FractalProps extends FractalBase {
  controls: IControls;
  fractals: Fractals | null;
}

export interface IFractal extends FractalBase {
  id: string;
  parentId: string;
  controls: IControls;
  fractals: Fractals | null;
  get array(): IFractal[];
  find(name: string, fractal?: IFractal): IFractal;
}

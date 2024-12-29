export enum Events {
  Hold = 'Hold',
  Touch = 'Touch',
}

export enum Indicators {
  X = 'X',
  Y = 'Y',
  Icon = 'Icon',
  Toggle = 'Toggle',
  Select = 'Select',
  Cursor = 'Cursor',
  Columns = 'Columns',
  Position = 'Position',
}

export enum Toggles {
  DragAndDrop = 'Drag-and-Drop',
}

export enum Selects {
  Menu = 'Menu',
}

export enum Collections {
  Home = 'Home',
  Users = 'Users',
  Products = 'Products',
}

export enum Modifiers {
  App = 'App',
  New = 'New',
  Edit = 'Edit',
  Save = 'Save',
  Delete = 'Delete',
  Columns = 'Columns',
}

export enum FractalStatus {
  New = 'New',
  Stable = 'Stable',
}

export type FractalsDto = Record<string, FractalDto>;
export type IFractals = Record<string, IFractal>;
export type ControlsDto = Record<string, ControlDto>;

export interface ControlDto {
  id: string;
  data: string;
  parentId: string;
  indicator: string;
}

export interface FractalEvent {
  type: keyof typeof Events;
  fractal: IFractal;
}

export interface FractalDto {
  id: string;
  parentId: string;
  fractals: FractalsDto | null;
  controls: ControlsDto;
}

export interface IFractal {
  dto: FractalDto;
  status: FractalStatus;
  parent: IFractal | null;
  fractals: IFractals | null;

  get list(): IFractal[];
  get cursor(): string;
  get columns(): string[];
  get indicators(): string[];
  get controlsList(): ControlDto[];

  is(test: string | object): boolean;
  data(indicator: string): string;
  find(test: Events[number], fractals?: IFractals | null): IFractal;
  cloneChild(): IFractal;
}

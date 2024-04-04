import { ControlDto, Control } from './control.type';

export interface Line {
  id: string;
  controls: Control[]
}

export interface LineDto {
  id: string;
  controls: ControlDto[]
}
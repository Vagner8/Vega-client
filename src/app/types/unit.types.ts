import { Control, ControlDto } from "./control.types";

export interface UnitDto {
  id: string;
  controls: ControlDto[]
}

export interface Unit {
  id: string;
  controls: Control[]
}
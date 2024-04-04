import { WritableSignal } from '@angular/core';

export enum Operation {
  None = 0,
  Create = 1,
  Update = 2,
  Delete = 3,
}

export enum ControlType {
  Text = 'text'
}

export interface ControlState {
  type: ControlType;
  name: string;
  value: string;
  operation: Operation;
}

export interface Control {
  id?: string;
  signal: WritableSignal<ControlState>;
}

export interface ControlDto {
  id?: string;
  type: ControlType;
  name: string;
  value: string;
  operation: Operation;
}
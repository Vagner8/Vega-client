import { WritableSignal } from '@angular/core';

export enum InputType {
  Text = 'Text',
  Email = 'Email',
  Password = 'Password',
}

export enum Click {
  One = 'One',
  Hold = 'Hold',
  Double = 'Double',
}

export interface Exception {
  type: string;
  title: string;
  status: 500;
  detail: string;
  instance: string;
}

export type WSS = WritableSignal<string | null>;
export type WSA = WritableSignal<string[]>;

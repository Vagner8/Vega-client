import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  root = signal<IFractal | null>(null);
  pages!: IFractal;
  manager!: IFractal;
  modifiers!: IFractal;

  taps = signal<IFractal | null>(null);
  table = signal<IFractal | null>(null);
  modifier = signal<IFractal | null>(null);
  managerEvent = signal('');
}

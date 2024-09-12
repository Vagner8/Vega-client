import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  data = signal<IFractal | null>(null);
}

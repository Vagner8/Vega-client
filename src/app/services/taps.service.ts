import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class TapsService {
  $taps = signal<IFractal | null>(null);
}

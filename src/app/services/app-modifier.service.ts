import { Injectable, signal } from '@angular/core';
import { IFractal } from '@types';

@Injectable({
  providedIn: 'root',
})
export class AppModifierService {
  $current = signal<IFractal | null>(null);
}

import { Injectable, signal } from '@angular/core';
import { FractalDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  data = signal<FractalDto | null>(null);
}

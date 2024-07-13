import { Injectable, signal } from '@angular/core';
import { FractalDto } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService {
  dto = signal<FractalDto | null>(null);
  view = signal<FractalDto | null>(null);

  setView(name: string): void {
    const dto = this.dto();
    console.log('🚀 ~ dto:', dto);
    this.view.set(dto && dto.fractals[name]);
  }
}

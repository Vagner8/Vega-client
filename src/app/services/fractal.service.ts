import { Injectable, signal } from '@angular/core';
import { FractalDto, FractalSignals } from '@types';

@Injectable({
  providedIn: 'root',
})
export class FractalService implements FractalSignals {
  Pages = signal<FractalDto | null>(null);
  Manager = signal<FractalDto | null>(null);
  Modifiers = signal<FractalDto | null>(null);

  // selected = signal<FractalDto[]>([]);

  // add(fractal: FractalDto): void {
  //   this.selected.update((state) => [...state, fractal]);
  // }

  // delete(fractal: FractalDto): void {
  //   this.selected.update((state) => state.filter((f) => f !== fractal));
  // }

  // clear(): void {
  //   this.selected.set([]);
  // }

  // hasSelected(): boolean {
  //   return this.selected().length > 0;
  // }

  // find(ids: string | null): FractalDto[] {
  //   if (!ids) return [];

  //   // const data = this.data();
  //   if (!data?.fractals) return [];

  //   const result: FractalDto[] = [];

  //   const searchFractals = (id: string, fractals: FractalsDto) => {
  //     for (const fractal of Object.values(fractals)) {
  //       if (fractal.id === id) {
  //         result.push(fractal);
  //         return;
  //       }
  //       if (fractal.fractals) {
  //         searchFractals(id, fractal.fractals);
  //       }
  //     }
  //   };

  //   ids.split(':').forEach((id) => searchFractals(id, data.fractals));

  //   return result;
  // }
}

import { Injectable, signal } from '@angular/core';
import { FractalFactory } from '@fractal';
import { AppEntities, Fractal, FractalDto } from '@types';
import { createDefaultFractal } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  $root = signal<Fractal | null>(null);
  pages: Fractal = createDefaultFractal(AppEntities.Pages);
  manager: Fractal = createDefaultFractal(AppEntities.Manager);
  modifiers: Fractal = createDefaultFractal(AppEntities.Modifiers);

  init(dto: FractalDto): void {
    const root = new FractalFactory({ dto });
    this.pages = root.findFractal(AppEntities.Pages) || this.pages;
    this.manager = root.findFractal(AppEntities.Manager) || this.manager;
    this.modifiers = root.findFractal(AppEntities.Modifiers) || this.modifiers;
    this.$root.set(root);
  }
}
